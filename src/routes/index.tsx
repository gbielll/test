import { NavigationContainer, DefaultTheme } from "@react-navigation/native"
import { Box } from "@gluestack-ui/themed"
import { AuthRoutes } from "./auth.routes"
import { gluestackUIConfig } from "../../config/gluestack-ui.config"

//rotas so sign in
import { AppRoutes } from "./app.routes"

export function Routes() {
    // É bom definir a cor de fundo no NavigationContainer,
    // pois ela será aplicada a todas as telas, já que ele é o elemento principal que renderiza as páginas.
    //isso evitar colocar tela por tela cor de fundo, posso colocar em um unico lugar
    const theme = DefaultTheme //importo ele - esse theme são config de estilização
    theme.colors.background = gluestackUIConfig.tokens.colors.gray600


    return (
        <Box flex={1}>
            {/*esse box é para evotar aquela tela branca q apere ao carregar a tela */}
            <NavigationContainer theme={theme}>
                <AuthRoutes/>
            </NavigationContainer>
        </Box>
    )
}