import { Button } from "@components/Button"
import { Input } from "@components/Input"
import { ScreenHeader } from "@components/ScreenHeader"
import { UserPhoto } from "@components/UserPhoto"
import { Center, Heading, Text, VStack, useToast } from "@gluestack-ui/themed"
import { Alert, ScrollView, TouchableOpacity } from "react-native"

import { useState } from "react"

//pegar tuddo da propriedade do import de img picker
import * as ImagePicker from "expo-image-picker"
//pega tudo de filesystem - biblioteca de validação de tamanho
import * as FileSystem from "expo-file-system"
import { ToastMessage } from "@components/ToastMassage"

export function Profile() {

    const [userPhoto, setUserPhoto] = useState("https:github.com/gbielll.png")

    //notificação de
    const toast = useToast()

    async function handleUserPhotoSelect() {
        try {
            //retorno a img para essa variavel
            const photoSelected = await ImagePicker.launchImageLibraryAsync({// abrir galeria
                mediaTypes: ImagePicker.MediaTypeOptions.Images, //pegar appenas img
                quality: 1,
                aspect: [4, 4],
                allowsEditing: true //frame para editar
            })

            if (photoSelected.canceled) {
                return //caso o usuário cancelar a gente finalizar
            }

            const photoURI = photoSelected.assets[0].uri //essse assets[0] q se encontra a foto e tenho q passar junto a sua url

            if (photoURI) {
                //vou pegar as informçaõe photoURI, incluindo as que quero (pode ser q n venha, por isso eu especifico com) "as"
                const photoInfo = (await FileSystem.getInfoAsync(photoURI) as {
                    size: number
                })

                if (photoInfo.size && (photoInfo.size / 1024 / 1024) > 5) {
                    return toast.show({
                        placement: "top", //definir onde eu quero q a menssagem apareça
                        render:({id}) => ( //ele ja gera um id o render
                            <ToastMessage id={id} title="Essa imagem é muito grande :(" description="Escolha uma de até 5MB" action="error" onClose={() => toast.close(id)} />
                        )
                    })
                }

                setUserPhoto(photoURI)
                toast.show({
                    placement: "top", //definir onde eu quero q a menssagem apareça
                    render:({id}) => ( //ele ja gera um id o render
                        <ToastMessage id={id} title="Imagem atualizada" description="sua imagem foi auterada com sucesso :)" action="success" onClose={() => toast.close(id)} />
                    )
                })
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <VStack flex={1}>
            <ScreenHeader title="Perfil" />


            <ScrollView contentContainerStyle={{
                paddingBottom: 36
            }}>
                <Center mt="$6" px="$10">
                    <UserPhoto
                        source={{ uri: userPhoto }}
                        alt="Foto do usuário"
                        size="xl"
                    />


                    <TouchableOpacity onPress={handleUserPhotoSelect}>
                        <Text
                            color="$green500"
                            fontFamily="$heading"
                            fontSize="$md"
                            mt="$2"
                            mb="$8"
                        >
                            Alterar foto
                        </Text>
                    </TouchableOpacity>

                    <Center w="$full" gap="$4">
                        <Input placeholder="Nome" bg="$gray500" />
                        <Input value="vitor@gmail.com" bg="$gray500" isReadOnly /*desabilitar o input, ta sendo receibdo como props*/ />
                    </Center>

                    <Heading
                        alignSelf="flex-start"
                        fontFamily="$heading"
                        color="$gray200"
                        fontSize="$md"
                        mt="$12"
                        mb="$2"
                    >
                        Alterar senha
                    </Heading>
                    <Center w="$full" gap="$4">
                        <Input placeholder="Senha antiga" bg="$gray500" />
                        <Input placeholder="Nova senha" bg="$gray500" />
                        <Input placeholder="Confirme a nova senha" bg="$gray500" />
                        <Button title="Atualizar" />
                    </Center>
                </Center>
            </ScrollView>
        </VStack>
    )
}