import { VStack, Image, Center, Text, Heading, ScrollView, onChange } from '@gluestack-ui/themed'

import BackgroudImg from "@assets/background.png"
import Logo from "@assets/logo.svg"
import { Input } from '@components/Input'
import { Button } from '@components/Button'

import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup" //para erros
//controller que controla nossos inputs
import { useForm, Controller } from 'react-hook-form'

//navegação - preciso dos dois arquivos
import { AuthNavigationRoutesProps } from "@routes/auth.routes"
import { useNavigation } from "@react-navigation/native"

type FormDataProps = {
    email: string,
    passworld: string
}

const signInSchema = yup.object({
    email: yup.string().required('Informe seu e-mail').email('Informe um email válido'),
    passworld: yup.string().required('Informe sua senha')
})

export function SingIn() {

    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(signInSchema)
    })

    //defino o tipo que foi justamente la nas rotas o type que exportei
    const navigator = useNavigation<AuthNavigationRoutesProps>()
    //ao chamar essa função ele leva a essa rota
    function handleNewAccount() {
        navigator.navigate("signUp")
    }

    function handlesingIn({ email, passworld }: FormDataProps) {
        console.log({ email, passworld });
    }


    //todos esses comando bem como suas configurações sao do import do gluesctk
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1/* ocupar todo o espaço */ }} showsVerticalScrollIndicator={false}>
            <VStack flex={1}>
                {/*esse VStack coloco os arquivos na vertical */}
                <Image
                    w="$full" //da propria conf do gluestack
                    h={624}
                    source={BackgroudImg}
                    defaultSource={BackgroudImg} //ele ajuda a acelara a imagem, no carregamento da imagem
                    alt="Pessoas treiando"
                    position='absolute'
                />

                <VStack flex={1} px="$10" pb="$16">


                    <Center my="$24">
                        {/*my - vertival*/}
                        <Logo />
                        <Text color="$gray100" fontSize="$sm">
                            Treine sua mente e seu corpo
                        </Text>
                    </Center>

                    <Center gap="$2">

                        {/*esse Heading é um compoente de importação de titulo*/}
                        <Heading color="$gray100">Acesse  a conta</Heading>
                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder="E-mail"
                                    keyboardType='email-address'
                                    autoCapitalize="none" //evotar a primeira letra maiucula
                                    errorMessage={errors.email?.message}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="passworld"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder="Senha"
                                    secureTextEntry //ele coloca aquelas bolinhas
                                    errorMessage={errors.passworld?.message}
                                />
                            )}
                        />

                        <Button title="Acessar" onPress={handleSubmit(handlesingIn)} />

                    </Center>
                    <Center flex={1} justifyContent="flex-end" mt="$4">
                        <Text color="$gray100" fontSize="$sm" mb="$3" fontFamily="$body">
                            Ainda não tem acesso?
                        </Text>
                        <Button title="Criar conta" variant="outline" onPress={handleNewAccount} />
                    </Center>
                </VStack>
            </VStack>
        </ScrollView>
    )
}