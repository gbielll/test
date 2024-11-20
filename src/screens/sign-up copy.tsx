import { VStack, Image, Center, Text, Heading, ScrollView, onChange } from '@gluestack-ui/themed'

import BackgroudImg from "@assets/background.png"
import Logo from "@assets/logo.svg"
import { Input } from '@components/Input'
import { Button } from '@components/Button'

import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"

import { useNavigation } from '@react-navigation/native'

//controller que controla nossos inputs
import { useForm, Controller } from 'react-hook-form'
import { FileJson } from 'lucide-react-native'

//criando a tipagem dos dados do input do controll
type FormDataProps = {
    name: string
    email: string
    passworld: string
    passworld_confirm: string
}

//criar os schemas - igual o zod
//required é pra dizer q é obrigatório
//string é pra dizer que é uma string
//no schema que eu delcaro os nomes e tipos das variáveis, mas devo declarar as tipagens antes
//eu devo infomar todos os dados que declarei na tioagem, pq se n vai dasr b.o no resolver da const que declaro logo a abaixo 
const signUpSchema = yup.object({
    name: yup.string().required('Informe o nome'),
    email: yup.string().required('Informe o e-mail').email('E-mail inválido'),
    passworld: yup.string().required('Informe a senha').min(6, 'A senha deve ter pelo menos 6 caracteres'),
    passworld_confirm: yup.string().required('Confirme a senha')
        .oneOf([yup.ref("passworld"),""], 'As senhas devem corresponder')
        
});

export function SingUp() {

    //faço a destruturação
    //com esse handleSubmit que conseguimos pegar todas as informaçoes do control e enviar para onde quiser
    //aqui no useForme eu passo a tipagem (aquele macete para exibir os dados)
    //destruturando formstate eu consigo recuperar os erros 
    //dessa forma o erro ja será aplicado so com o nome dos schemas nos controller.
    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(signUpSchema), // aqui eu passo o schema que quero usar PARA SER APLICDO NO CONTROLL
        /* defaultValues: {
            name: 'Gabreil' // posso definir esses valores pré-preenchidos no input - iniciais
        } */
    });

    const navigator = useNavigation()

    function handleGoBack() {
        navigator.goBack()//volta pra tela anterios a ele, pq é snack - por isso nao fiz a tipagem igual na tela de sign in
    }

    //any é uma tipagem de "qualquer coisa"
    //eu defino o tipo de date de acordo com a tipagem que eu criei, posso destruturar tb
    //forma sem ta destruturada data: FormDataProps
    function handleSignUp({ name, email, passworld, passworld_confirm }: FormDataProps) {
       
    }

    //todos esses comando bem como suas configurações sao do import do gluesctk
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1/* ocupar todo o espaço */ }} showsVerticalScrollIndicator={false}>
            <VStack flex={1} >
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

                    <Center gap="$2" flex={1}>

                        {/*esse Heading é um compoente de importação de titulo*/}
                        <Heading color="$gray100">Crie sua conta</Heading>

                        <Controller
                            control={control} //controlador do input
                            name="name" //deifno o nome do input para saber quem ele eh
                            /*rules={{//com isso o campo será obrigatório, tanto que se eu nao digitar nada o hanldsubmit nao é executado
                                required: 'Preencha o campo' //esse texto que vai aparecer na mensagem de erro, mas eu devo chamr ele em um text
                            }}*/

                            render={({ field: { onChange, value } }) => ( //digo quem quero redenrizar
                                //essas destruturações em cima sao os valores ja manipulados pelo control
                                <Input
                                    placeholder="Nome"
                                    onChangeText={onChange} //pegar os valores digitados, mas passo para a destruturação do field
                                    value={value}
                                    errorMessage={errors.name?.message}
                                />
                            )}
                        />
                        <Controller
                            control={control} //controlador do input
                            name="email" //deifno o nome do input para saber quem ele eh
                            render={({ field: { onChange, value } }) => ( //digo quem quero redenrizar
                                //essas destruturações em cima sao os valores ja manipulados pelo control, atraves do field
                                <Input
                                    onChangeText={onChange} //manipulado
                                    value={value}
                                    placeholder="E-mail"
                                    keyboardType='email-address'
                                    autoCapitalize="none" //evotar a primeira letra maiucula 
                                    errorMessage={errors.email?.message} //passo o erro (se houverpq ele é opcional na tipagem) para o input
                                />
                            )}
                        />

                        {/* assim eu passo o erro, mas vou passar esse error como props, mas desse jeito pode 
                        {errors.email?.message && // esse ? ele vai buscar se tem o name antes de chamar o mesagem
                            <Text color="$white">
                                {errors.email.message}
                                nesse eu n preciso fazer a validação do  '?' pq eu ja faço ele em cima
                              a mensagem que vai aparecer aqui vai ser a que definir no 'rules'
                             */}


                        <Controller
                            control={control}
                            name="passworld"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder="Senha"
                                    secureTextEntry //ele coloca aquelas bolinhas ****
                                    errorMessage={errors.passworld?.message}
                                />
                            )}
                        />


                        <Controller
                            control={control}
                            name="passworld_confirm"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder="Confirmar a senha"
                                    secureTextEntry //ele coloca aquelas bolinhas
                                    //enviar infor pelo teclado
                                    onSubmitEditing={handleSubmit(handleSignUp)} //enviar as infors
                                    returnKeyType="send" //icone de enciar 
                                    errorMessage={errors.passworld_confirm?.message}

                                />
                            )}
                        />


                        <Button title="Criar e acessar"
                            //esse hanldeSubimt qu epegar todos os dados do control, dito isso
                            //para a função que vou mandar eu envolvo ela dentro do handlesubmit
                            //ou seja, esse handleSubmit vai passar para a funçaõ q ele envolve todos os dados do control
                            onPress={handleSubmit(handleSignUp)}
                        />

                    </Center>


                    <Button title="Voltar para o login" variant="outline" mt="$12" onPress={handleGoBack} />

                </VStack>
            </VStack>
        </ScrollView>
    )
}