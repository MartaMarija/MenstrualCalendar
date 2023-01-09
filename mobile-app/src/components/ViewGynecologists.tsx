import { useEffect, useState } from 'react'
import {
    Pressable,
    Text,
    View,
    StyleSheet,
    Modal,
    FlatList,
    Dimensions,
    TouchableWithoutFeedback,
} from 'react-native'
import { getGynecologists, delteGynecologist } from '../api/gynecologist'
import { Gynecologist } from '../api/response/Gynecologist'
import { useAuth } from '../contexts/Auth'

interface Props {
    setViewGynecologists: (
        pressed: boolean | ((prevPressed: boolean) => boolean)
    ) => void
}

const screen = Dimensions.get('window')

const ViewGynecologists: React.FC<Props> = ({ setViewGynecologists }) => {
    const auth = useAuth()
    const [gynecologists, setGynecologists] = useState<Gynecologist[]>()

    useEffect(() => {
        ;(async () => {
            fetchGyns()
        })()
    }, [deleteGyn])

    async function fetchGyns() {
        const gynecologists = await getGynecologists(auth.authData?.token)
        setGynecologists(gynecologists)
    }

    async function deleteGyn(gynId: string) {
        const medicalExams = await delteGynecologist(
            auth.authData?.token,
            gynId
        )
    }

    return (
        <Modal>
            <View style={styles.container}>
                <View style={styles.titleBackground}>
                    <Text style={styles.title}>Gynecologist</Text>
                </View>
                <FlatList
                    style={styles.flatList}
                    data={gynecologists}
                    renderItem={({ item }) => (
                        <TouchableWithoutFeedback>
                            <View style={styles.labelTextContainer}>
                                <View style={styles.labelTextContainer2}>
                                    <Text style={styles.label}>
                                        First name::{' '}
                                    </Text>
                                    <Text style={styles.text}>
                                        {item.first_name}
                                    </Text>
                                </View>
                                <View style={styles.labelTextContainer2}>
                                    <Text style={styles.label}>
                                        Last name:{' '}
                                    </Text>
                                    <Text style={styles.text}>
                                        {item.last_name}
                                    </Text>
                                </View>
                                <View style={styles.labelTextContainer2}>
                                    <Text style={styles.label}>Address: </Text>
                                    <Text style={styles.text}>
                                        {item.address}
                                    </Text>
                                </View>
                                <View style={styles.labelTextContainer2}>
                                    <Text style={styles.label}>
                                        Telephone:{' '}
                                    </Text>
                                    <Text style={styles.text}>
                                        {item.telephone}
                                    </Text>
                                </View>

                                <TouchableWithoutFeedback
                                onPress={() => deleteGyn(item.id)}
                                >
                                    <Pressable
                                        style={styles.buttonSmall}
                                        onPress={() => deleteGyn(item.id)}
                                    >
                                        <Text style={styles.buttonText}>
                                            Delete
                                        </Text>
                                    </Pressable>
                                </TouchableWithoutFeedback>
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                    keyExtractor={item => item.id}
                />
                <Pressable
                    style={styles.button}
                    onPress={() => setViewGynecologists(false)}
                >
                    <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    flatList: {
        width: screen.width - 30,
    },
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
        marginTop: 5,
    },
    labelTextContainer2: {
        margin: 5,
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
        marginBottom: 10,
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
    buttonSmall: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32,
        width: 150,
        borderRadius: 8,
        elevation: 5,
        backgroundColor: 'red',
        height: 53,
        margin: 10,
        borderStartColor: 'blue',
        zIndex: 5,
    },
})

export default ViewGynecologists
