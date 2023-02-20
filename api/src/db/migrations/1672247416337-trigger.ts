import { MigrationInterface, QueryRunner } from 'typeorm';

export class trigger1672247416337 implements MigrationInterface 
{
	public async up(queryRunner: QueryRunner): Promise<void> 
	{
		const schemaName: string = process.env.DB_SCHEMA || 'mencal';

		await queryRunner.query(`set schema '${schemaName}';`);

		await queryRunner.query(`
      CREATE OR REPLACE FUNCTION update_menstrual_cycle()
      RETURNS TRIGGER AS $$
      DECLARE last_cycle "mencal".menstrual_cycle%ROWTYPE;
      DECLARE _user "mencal"."user"%ROWTYPE;
      DECLARE selected_row_id uuid;
      DECLARE new_avg_cycle_duration int = 0;
      DECLARE new_avg_menstruation_duration int = 0;
      DECLARE counter int = 0;
      DECLARE pomCD int = 0;
      DECLARE pomMD int = 0;
      BEGIN
        --update_last_menstrual_cycle
        SELECT * INTO last_cycle FROM  "mencal".menstrual_cycle WHERE "userId" = NEW."userId" ORDER BY cycle_start_date DESC LIMIT 1;
        
        IF last_cycle IS NOT NULL THEN    
            UPDATE "mencal".menstrual_cycle
            SET cycle_duration = (NEW.cycle_start_date - last_cycle.cycle_start_date),
                ovulation_date = NEW.cycle_start_date - last_cycle.luteal_phase_duration
            WHERE "userId" = NEW."userId"
            AND id = last_cycle.id;
        END IF;
        
        --update_user_avg_durations
        FOR selected_row_id IN SELECT id FROM "mencal".menstrual_cycle WHERE "userId" = NEW."userId" AND cycle_duration < 50 ORDER BY cycle_start_date DESC LIMIT 7 LOOP
          counter := counter + 1;
          SELECT cycle_duration INTO pomCD FROM "mencal".menstrual_cycle WHERE id = selected_row_id;
          SELECT menstruation_duration  INTO pomMD FROM "mencal".menstrual_cycle WHERE id = selected_row_id;
          new_avg_cycle_duration := new_avg_cycle_duration + pomCD;
          new_avg_menstruation_duration := new_avg_menstruation_duration + pomMD;
        END LOOP;
        
        IF new_avg_cycle_duration <> 0 THEN
          new_avg_cycle_duration := new_avg_cycle_duration/counter;
          new_avg_menstruation_duration := new_avg_menstruation_duration/counter;
          UPDATE "mencal"."user" SET avg_duration_of_menstrual_cycle = new_avg_cycle_duration, 
          avg_duration_of_menstruation = new_avg_menstruation_duration
          WHERE id = NEW."userId";
        END IF;
        
        --update_new_menstrual_cycle
        SELECT * INTO _user FROM "mencal"."user" WHERE "id" = NEW."userId";
        NEW.cycle_duration = _user.avg_duration_of_menstrual_cycle;
        NEW.menstruation_duration = _user.avg_duration_of_menstruation;
        NEW.luteal_phase_duration = _user.avg_duration_of_luteal_phase;
        NEW.menstruation_end_date = NEW.cycle_start_date + NEW.menstruation_duration - INTERVAL '1 day';
        NEW.ovulation_date = NEW.cycle_start_date + NEW.cycle_duration - NEW.luteal_phase_duration - INTERVAL '1 day';    
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE OR REPLACE TRIGGER update_menstrual_cycle_trigger
      BEFORE INSERT ON menstrual_cycle
      FOR EACH ROW
      EXECUTE PROCEDURE update_menstrual_cycle();

      CREATE OR REPLACE FUNCTION update_menstruation_duration()
      RETURNS TRIGGER AS $$
      DECLARE difference int;
      BEGIN
        SELECT (NEW.menstruation_end_date - cycle_start_date + 1 ) INTO difference FROM "mencal".menstrual_cycle WHERE id = NEW.id;
        NEW.menstruation_duration = difference;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE OR REPLACE TRIGGER update_menstruation_duration_trigger
      BEFORE UPDATE ON menstrual_cycle
      FOR EACH ROW
      EXECUTE PROCEDURE update_menstruation_duration();

      CREATE OR REPLACE FUNCTION update_last_menstruation()
      RETURNS TRIGGER AS $$
      DECLARE selected_row_id uuid;
      DECLARE new_avg_cycle_duration int = 0;
      DECLARE new_avg_menstruation_duration int = 0;
      DECLARE counter int = 0;
      DECLARE pomCD int = 0;
      DECLARE pomMD int = 0;
      BEGIN
        FOR selected_row_id IN SELECT id FROM "mencal".menstrual_cycle WHERE "userId" = OLD."userId" AND cycle_duration < 50 ORDER BY cycle_start_date DESC OFFSET 1 ROWS LIMIT 7 LOOP
          counter := counter + 1;
          SELECT cycle_duration INTO pomCD FROM "mencal".menstrual_cycle WHERE id = selected_row_id;
          SELECT menstruation_duration  INTO pomMD FROM "mencal".menstrual_cycle WHERE id = selected_row_id;
          new_avg_cycle_duration := new_avg_cycle_duration + pomCD;
          new_avg_menstruation_duration := new_avg_menstruation_duration + pomMD;
        END LOOP;

        IF new_avg_cycle_duration <> 0 THEN
          new_avg_cycle_duration := new_avg_cycle_duration/counter;
          new_avg_menstruation_duration := new_avg_menstruation_duration/counter;
          UPDATE "mencal"."user" SET avg_duration_of_menstrual_cycle = new_avg_cycle_duration, 
          avg_duration_of_menstruation = new_avg_menstruation_duration
          WHERE id = OLD."userId";

          SELECT id into selected_row_id FROM "mencal".menstrual_cycle WHERE "userId" = OLD."userId" ORDER BY cycle_start_date DESC LIMIT 1;
          UPDATE "mencal"."menstrual_cycle" SET cycle_duration = new_avg_cycle_duration, 
          menstruation_duration = new_avg_menstruation_duration,
          ovulation_date = cycle_start_date + new_avg_cycle_duration - luteal_phase_duration 
          WHERE id = selected_row_id;
        END IF;

        RETURN OLD;
      END;
      $$ LANGUAGE plpgsql;

      CREATE OR REPLACE TRIGGER update_last_menstruation_trigger
      after DELETE ON menstrual_cycle
      FOR EACH ROW
      EXECUTE PROCEDURE update_last_menstruation();

    `);
	}

	down(): Promise<void> 
	{
		throw new Error('Method not implemented.');
	}
}
