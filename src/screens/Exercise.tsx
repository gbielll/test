import { VStack, Text, Icon, HStack, Heading, Image, Box } from "@gluestack-ui/themed";
import { ScrollView, TouchableOpacity } from "react-native";
import { ArrowLeft } from "lucide-react-native"; // Ícone de voltar
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Button } from "@components/Button";

import BodySvg from "@assets/body.svg";
import SeriesSvg from "@assets/series.svg";
import Repetitionsvg from "@assets/repetitions.svg";

export function Exercise() {
    const navigation = useNavigation<AppNavigatorRoutesProps>();

    function handleGoBack() {
        navigation.goBack();
    }

    return (
        <VStack flex={1}>
            <VStack px="$8" bg="$gray500" pt="$12">
                <TouchableOpacity onPress={handleGoBack}>
                    <Icon as={ArrowLeft} color="$green500" size="xl" />
                </TouchableOpacity>

                <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    mt="$4"
                    mb="$8"
                >
                    <Heading
                        color="$gray100"
                        fontFamily="$heading"
                        fontSize="$lg"
                        flexShrink={1} // Evita que os componentes internos empurrem uns aos outros
                    >
                        Puxada frontal
                    </Heading>
                    <HStack alignItems="center">
                        <BodySvg />
                        <Text color="$gray200" ml="$1" textTransform="capitalize">costas</Text>
                    </HStack>
                </HStack>
            </VStack>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle=
                {{
                    paddingBottom: 32
                }}>
                <VStack p="$8">
                    <Image
                        source={{
                            uri: "https://abdominales.info/wp-content/uploads/2014/12/ejercicios-para-quemar-grasas-dominadas-istock-600x399.jpg"
                        }}
                        alt="Exercício"
                        mb="$3"
                        resizeMode="cover"
                        rounded="$lg"
                        w="$full"
                        h="$80"
                    />

                    <Box bg="$gray500" rounded="$md" pb="$4" px="$4">
                        <HStack alignItems="center" justifyContent="space-around" mb="$6" mt="$5">
                            <HStack>
                                <SeriesSvg />
                                <Text color="$gray200" ml="$2">3 séries</Text>
                            </HStack>

                            <HStack>
                                <Repetitionsvg />
                                <Text color="$gray200" ml="$2">12 repetições</Text>
                            </HStack>
                        </HStack>

                        <Button title="Marcar como realizado" />
                    </Box>

                </VStack>
            </ScrollView>
        </VStack>
    );
}