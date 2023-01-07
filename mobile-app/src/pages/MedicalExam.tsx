import { useState } from 'react'
import { Pressable, Text, View, StyleSheet } from 'react-native'
import AddGynecologist from '../components/AddGynecologist'
import ViewMedicalExam from '../components/ViewMedicalExam'

const MedicalExam = () => {
    const [viewMedicalExams, setViewMedicalExams] = useState(false)
    const [addGynecologist, setAddGynecologist] = useState(false)
    return (
        <View>
            {viewMedicalExams && <ViewMedicalExam setViewMedicalExams={setViewMedicalExams}/>}
            {addGynecologist && <AddGynecologist setAddGynecologist={setAddGynecologist}/>}
            <View style={styles.container}>
                <Pressable style={styles.button} onPress={()=>setAddGynecologist(true)}>
                    <Text style={styles.buttonText}>Add gynecologist</Text>
                </Pressable>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Add medical exam</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={()=>setViewMedicalExams(true)}>
                    <Text style={styles.buttonText}>View gynecologists</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={()=>setViewMedicalExams(true)}>
                    <Text style={styles.buttonText}>View medical exams</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '500',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        width: 300,
        borderRadius: 8,
        elevation: 3,
        backgroundColor: 'red',
        height: 63,
        margin: 10,
    },
})

export default MedicalExam
