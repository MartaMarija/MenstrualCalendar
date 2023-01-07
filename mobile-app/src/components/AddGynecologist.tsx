import { Formik } from 'formik'
import {
    Pressable,
    TextInput,
    View,
    Text,
    StyleSheet,
    Modal,
    Dimensions,
} from 'react-native'
import { insertGynecologist } from '../api/gynecologist'
import { Gynecologist } from '../api/response/Gynecologist'
import { useAuth } from '../contexts/Auth'

interface Props {
    setAddGynecologist: (
        pressed: boolean | ((prevPressed: boolean) => boolean)
    ) => void
}

const screen = Dimensions.get('window')

const AddGynecologist: React.FC<Props> = ({ setAddGynecologist }) => {
    const auth = useAuth()
    async function submit(values: Gynecologist) {
        await insertGynecologist(auth.authData?.token, values)
        setAddGynecologist(false)
    }

    return (
        <Modal>
            <Formik
                initialValues={{
                    id: '',
                    firstName: '',
                    lastName: '',
                    telephone: '',
                    address: '',
                }}
                onSubmit={(values: Gynecologist) => submit(values)}
            >
                {props => (
                    <View style={styles.container}>
                        <View style={styles.titleBackground}>
                            <Text style={styles.title}>Add gynecologist</Text>
                        </View>
                        <View>
                            <Text style={styles.text}>First name:</Text>
                            <TextInput
                                onChangeText={props.handleChange('firstName')}
                                onBlur={props.handleBlur('firstName')}
                                value={props.values.firstName}
                                style={styles.labelTextContainer}
                                selectionColor="red"
                            />
                            <Text style={styles.text}>Last name:</Text>
                            <TextInput
                                onChangeText={props.handleChange('lastName')}
                                onBlur={props.handleBlur('lastName')}
                                value={props.values.lastName}
                                style={styles.labelTextContainer}
                                selectionColor="red"
                            />
                            <Text style={styles.text}>Telephone:</Text>
                            <TextInput
                                onChangeText={props.handleChange('telephone')}
                                onBlur={props.handleBlur('telephone')}
                                value={props.values.telephone}
                                style={styles.labelTextContainer}
                                selectionColor="red"
                            />
                            <Text style={styles.text}>Address:</Text>
                            <TextInput
                                onChangeText={props.handleChange('address')}
                                onBlur={props.handleBlur('address')}
                                value={props.values.address}
                                style={styles.labelTextContainer}
                                selectionColor="red"
                            />
                        </View>
                        <Pressable
                            style={styles.button}
                            onPress={() => props.handleSubmit()}
                        >
                            <Text style={styles.buttonText}>Submit</Text>
                        </Pressable>
                        <Pressable
                            style={styles.button}
                            onPress={() => setAddGynecologist(false)}
                        >
                            <Text style={styles.buttonText}>Cancel</Text>
                        </Pressable>
                    </View>
                )}
            </Formik>
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
        marginTop: 5,
        width: screen.width - 30,
        fontSize: 18,
    },
    label: {
        fontSize: 18,
        fontWeight: '600',
    },
    text: {
        fontSize: 18,
        fontWeight: '500',
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
})

export default AddGynecologist
