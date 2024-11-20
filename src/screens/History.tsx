import { VStack } from "@gluestack-ui/themed";
import { ScreenHeader } from "@components/ScreenHeader";
import { HistoryCard } from "@components/HistoryCard";
import { useState } from "react";
import { SectionList } from "react-native";
import { Heading,Text} from "@gluestack-ui/themed";

 

export function History() {
    const [exercises, setExercises] = useState([
        {
            //titulo, aquele grande do sectionList
            title: "22.07.24",
            //dados da lista
            data: ["Puxada frontal", "Remada unilateral"]
        }, {
            title: "23.07.24",
            data: ["Puxada frontal"]
        }
    ])
    return (
        <VStack flex={1}>
            <ScreenHeader title="Histórico de exercício" />

            <SectionList
                sections={exercises} //pego os dados que criei em frome de array
                keyExtractor={ item => item}
                renderItem={() => <HistoryCard />}
                //esse comando que separa as seções {de acorco com oq especifico dentro} do sectionList e mostras tb os titles
                renderSectionHeader={({ section}) => (
                    <Heading color="$gray200" fontSize="$md" mt="$10" mb="$3" fontFamily="$heading">
                        {section.title}</Heading>
                )}
                style = {{paddingHorizontal:32}}
                contentContainerStyle ={
                    //se a lista for vazia, entao eu faço (pq se eu usar o ?, eu tenho q fazer uma cond :)
                    exercises.length === 0 && { 
                        flex: 1, justifyContent:  "center" 
                    }
                }
                //caso n tenha nada na lista
                ListEmptyComponent={() => (
                        <Text>Não há nada na lista ainda</Text>
                )
                }
            />

        </VStack>
    )
}