import { Heading, HStack, Image, Text, VStack, Icon } from "@gluestack-ui/themed";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { ChevronRight } from "lucide-react-native"
import { CheckCheck } from "lucide";

//falo que essa tipagem será do tipo TouchableOpacityProps
//eses icones do lucide nao da para personalizar de cara, por isos tenho que colocar ele dentro da tag icon e passar ele dentro dela para estilar o icon pra assim afetar no icones do vector

//so passando as propriedades padrões do TouchableOpacityProps : fica estático, preciso passar outros dados caso eu queira 
type Props = TouchableOpacityProps & {

}

export function ExerciseCard({ ...rest }: Props) {
    return (
        <TouchableOpacity {...rest}>
            <HStack bg="$gray500" alignItems="center" p="$2" pr="$4" rounded="$md" mb="$3">

                <Image
                    source={{
                        uri: "https://abdominales.info/wp-content/uploads/2014/12/ejercicios-para-quemar-grasas-dominadas-istock-600x399.jpg"
                    }}// essa imagem n ta aparecendo

                    alt="Imagem do exercício"

                    w="$16"
                    h="$16"
                    rounded="$md"
                    mr="$4"
                    resizeMode="cover"
                />

                <VStack flex={1}>
                    <Heading fontSize="$lg" color="$white" fontFamily="$heading" >
                        Puxada frontal
                    </Heading>
                    <Text fontSize="$sm" color="$gray200" mt="$1" numberOfLines={2} /*limyte de linhas, apos isso ele coloca os ... */>3 séries x 12 repetições</Text>
                </VStack>
                <Icon as={ChevronRight} color="$gray300"/>
            </HStack>
        </TouchableOpacity>
    )
}