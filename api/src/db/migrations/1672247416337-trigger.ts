import { MigrationInterface, QueryRunner } from "typeorm";

export class trigger1672247416337 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const schemaName: string = process.env.DB_SCHEMA || "mencal";

    await queryRunner.query(`set schema '${schemaName}';`);

    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION update_last_menstrual_cycle()
      RETURNS TRIGGER AS $$
      BEGIN
        UPDATE menstrual_cycle
        SET cycle_duration = EXTRACT(day FROM (new.cycle_start_date - cycle_start_date)),
            ovulation_date = new.cycle_start_date - luteal_phase_duration
        WHERE userId = new.userId
        AND (SELECT COUNT(*) FROM menstrual_cycle WHERE userId = new.userId) > 0
        AND cycle_start_date = (SELECT max(cycle_start_date) FROM menstrual_cycle WHERE userId = new.userId);
      END;
      $$ LANGUAGE plpgsql;

      CREATE OR REPLACE FUNCTION update_user_avg_durations()
      RETURNS TRIGGER AS $$
      DECLARE new_avg_cycle_duration int;
      DECLARE new_avg_menstruation_duration int;
      DECLARE num_of_cycles int;
      BEGIN
          WITH last_7_cycles AS (
              SELECT cycle_duration, menstruation_duration
              FROM menstrual_cycle
              WHERE "userId" = NEW."userId"
              ORDER BY cycle_start_date DESC
              LIMIT 7
          )
          SELECT COUNT(*) INTO num_of_cycles FROM last_7_cycles;
          IF num_of_cycles > 0 THEN
            SELECT AVG(cycle_duration), AVG(menstruation_duration)
            INTO new_avg_cycle_duration,  new_avg_menstruation_duration
            FROM last_7_cycles;
            UPDATE "user" SET avg_duration_of_menstrual_cycle = COALESCE(new_avg_cycle_duration, avg_duration_of_menstrual_cycle), 
            avg_duration_of_menstruation = COALESCE(new_avg_menstruation_duration, avg_duration_of_menstruation) 
            WHERE id = NEW."userId";
          END IF;
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE OR REPLACE FUNCTION update_new_menstrual_cycle()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.cycle_duration = (SELECT avg_cycle_duration FROM "user" WHERE id = NEW.userId);
        NEW.menstruation_duration = (SELECT avg_menstruation_duration FROM "user" WHERE id = NEW.userId);
        NEW.luteal_phase_duration = (SELECT avg_luteal_phase_duration FROM "user" WHERE id = NEW.userId);
        NEW.menstruation_end_date = NEW.cycle_start_date + NEW.menstruation_duration - INTERVAL '1 day';
        NEW.ovulation_date = NEW.cycle_start_date + NEW.cycle_duration - NEW.luteal_phase_duration - INTERVAL '1 day';
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE OR REPLACE FUNCTION update_menstrual_cycle()
      RETURNS TRIGGER AS $$
      BEGIN
        PERFORM update_last_menstrual_cycle();
        PERFORM update_user_avg_durations();
        PERFORM update_new_menstrual_cycle();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE OR REPLACE TRIGGER updates_before_insert_on_menstrual_cycle_trigger
      BEFORE INSERT ON menstrual_cycle
      FOR EACH ROW
      EXECUTE PROCEDURE update_menstrual_cycle();

      CREATE OR REPLACE FUNCTION update_menstruation_duration()
      RETURNS TRIGGER AS $$
      BEGIN
          UPDATE menstrual_cycle
          SET menstruation_duration = (NEW.menstruation_end_date - cycle_start_date) + interval '1 day'
          WHERE id = NEW.id;
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE OR REPLACE TRIGGER update_menstruation_duration_trigger
      BEFORE UPDATE ON menstrual_cycle
      FOR EACH ROW
      EXECUTE PROCEDURE update_menstruation_duration();

    `);
  }

  down(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
