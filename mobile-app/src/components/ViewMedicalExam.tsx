import { useEffect, useState } from 'react'
import {
    Pressable,
    Text,
    View,
    StyleSheet,
    Modal,
    FlatList,
    Dimensions,
} from 'react-native'
import { getMedicalExams } from '../api/medicalExam'
import { MedicalExam } from '../api/response/MedicalExam'
import { useAuth } from '../contexts/Auth'

interface Props {
    setViewMedicalExams: (
        pressed: boolean | ((prevPressed: boolean) => boolean)
    ) => void
}

const screen = Dimensions.get('window')

const ViewMedicalExam: React.FC<Props> = ({ setViewMedicalExams }) => {
    const auth = useAuth()
    const [medicalExams, setMedicalExams] = useState<MedicalExam[]>()

    useEffect(() => {
        ;(async () => {
            fetchExams()
        })()
    }, [])

    async function fetchExams() {
        const medicalExams = await getMedicalExams(auth.authData?.token)
        setMedicalExams(medicalExams)
    }

    const Item = ({ date, description, gynecologist }: MedicalExam) => (
        <View style={styles.labelTextContainer}>
            <View style={styles.labelTextContainer2}>
            <Text style={styles.label}>Date: </Text>
            <Text style={styles.text}>{date.toString()}</Text>
            </View>
            <View style={styles.labelTextContainer2}>
            <Text style={styles.label}>Description: </Text>
            <Text style={styles.text}>{description}</Text>
            </View>
            <View style={styles.labelTextContainer2}>
            <Text style={styles.label}>GYN name: </Text>
            <Text style={styles.text}>{gynecologist.firstName} {gynecologist.lastName}</Text>
            </View>
        </View>
    )

    const renderItem = ({ item }: { item: MedicalExam }) => {
        let gynecologistFirstName = ''
        let gynecologistLastName = ''
        if (item.gynecologist) {
            gynecologistFirstName = `${item.gynecologist.firstName}`
            gynecologistLastName = `${item.gynecologist.lastName}`
        }
        return (
            <Item
                date={item.date}
                id={''}
                description={item.description}
                gynecologist={{
                    id: '',
                    firstName: gynecologistFirstName,
                    lastName: gynecologistLastName,
                    telephone: '',
                    address: '',
                }}
            />
        )
    }

    return (
        <Modal>
            <View style={styles.container}>
                <View  style={styles.titleBackground}>
                    <Text style={styles.title}>Medical Exam</Text>
                </View>
                <FlatList
                    data={medicalExams}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
                <Pressable
                    style={styles.button}
                    onPress={() => setViewMedicalExams(false)}
                >
                    <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    labelTextContainer: {
        padding: 10,
        borderRadius: 10,
        borderColor: 'red',
        borderWidth: 3,
        marginBottom: 10,
        marginTop: 5 
    },
    labelTextContainer2: {
        margin: 5
    },
    label: {
        fontSize: 18,
        fontWeight: '600',
    },
    text: {
        fontSize: 18,
    },
    titleBackground: {
        backgroundColor: 'red',
        padding: 15,
        width: screen.width,
        marginBottom: 10
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
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

export default ViewMedicalExam
