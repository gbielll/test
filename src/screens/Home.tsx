import { Group } from "@components/Group"
import { HomeHeader } from "@components/HomeHeader"
import { Center, Heading, HStack, Text, VStack } from "@gluestack-ui/themed"
import { useState } from "react"
import { FlatList } from "react-native"
import { ExerciseCard } from "@components/ExerciseCard"
import { useNavigation } from "@react-navigation/native"
import { AppNavigatorRoutesProps } from "@routes/app.routes"

export function Home() {

    const [exercises, setExercises] = useState([
        "Puxada frontal",
        "Remada",
        "Remada unilateral",
        "Lavantamento terra",
        "Remada unilateral",
        "Lavantamento terra"
    ])

    const [groups, setGroups] = useState(["Costas", "Bíceps", "Tríceps", "Ombro"])
    const [groupSelected, setGroupSelected] = useState("Costas")

    const navigation = useNavigation<AppNavigatorRoutesProps>()
    
    function handleOpenExerciseDetails(){
        navigation.navigate("exercise")
    }

    return (
        <VStack flex={1}>
            <HomeHeader />
            <FlatList data={groups}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    //ESSE .toLowerCase() É PARA PASSAR TUDO PARA MINUSCULO - PARA MAIUSCULO : TOUPPERCASE -> cOsta === coStA
                    <Group name={item} isActive={groupSelected.toLowerCase() === item.toLowerCase()} onPress={() =>
                        setGroupSelected(item)
                    } />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 30 }} //estilização do flatList
                style={{ marginVertical: 40, maxHeight: 44, minHeight: 44 }}
            />
            <VStack flex={1} px="$8">
                <HStack justifyContent="space-between" mb="$5" alignItems="center">
                    <Heading color="$gray200" fontSize="$md" fontFamily="$heading">
                        Exercícios
                    </Heading>
                    <Text color="$gray200" fontSize="$sm" fontFamily="$body">
                        {exercises.length}
                    </Text>
                </HStack>

                <FlatList
                    data={exercises}
                    keyExtractor={item => item}
                    renderItem={() => <ExerciseCard  onPress={handleOpenExerciseDetails}/>}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom:20
                    }}
                />

            </VStack>
        </VStack>
    )
}