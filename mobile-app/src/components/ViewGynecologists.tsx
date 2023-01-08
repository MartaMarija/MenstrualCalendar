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
import { getGynecologists } from '../api/gynecologist'
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
    }, [])

    async function fetchGyns() {
        const gynecologists = await getGynecologists(auth.authData?.token)
        setGynecologists(gynecologists)
    }

    const Item = ({ first_name, last_name, address, telephone }: Gynecologist) => (
        <View style={styles.labelTextContainer}>
            <View style={styles.labelTextContainer2}>
            <Text style={styles.label}>First name:: </Text>
            <Text style={styles.text}>{first_name}</Text>
            </View>
            <View style={styles.labelTextContainer2}>
            <Text style={styles.label}>Last name: </Text>
            <Text style={styles.text}>{last_name}</Text>
            </View>
            <View style={styles.labelTextContainer2}>
            <Text style={styles.label}>Address: </Text>
            <Text style={styles.text}>{address}</Text>
            </View>
            <View style={styles.labelTextContainer2}>
            <Text style={styles.label}>Telephone: </Text>
            <Text style={styles.text}>{telephone}</Text>
            </View>
        </View>
    )

    const renderItem = ({ item }: { item: Gynecologist }) => {

        return (
            <Item
                first_name={item.first_name}
                last_name={item.last_name}
                address={item.address}
                telephone={item.telephone}
                id={item.id}
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
                    data={gynecologists}
                    renderItem={renderItem}
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

export default ViewGynecologists
