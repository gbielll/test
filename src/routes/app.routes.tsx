import {createBottomTabNavigator, BottomTabNavigationProp} from "@react-navigation/bottom-tabs"
//devo impotar os componentes das rotas que cou usar
import { Home } from "@screens/Home";
import { Exercise } from "@screens/Exercise";
import { Profile } from "@screens/Profile";
import { History } from "@screens/History";

//crio um tipagem para ter flexbilidade e ainda n exporto
type AppRoutes = {
  home: undefined;
  exercise: undefined;
  profile: undefined;
  history: undefined
}

//aqui eu exporto definidno a tipagem
export type AppNavigatorRoutesProps =  BottomTabNavigationProp<AppRoutes>


//destruturar os que vou usar do tab da importação
//macete de colocar aqui o <AppRoutes> pra aparecer as opções que defnir de rotas
const {Navigator, Screen} = createBottomTabNavigator<AppRoutes>();

//vou usar as propriedades do gluestack para personalizar os icons
import {gluestackUIConfig} from  "../../config/gluestack-ui.config"

//imporar os icones svg
import HomeSvg from "@assets/home.svg"
import HistorySvg from "@assets/history.svg"
import ProfileSvg from "@assets/profile.svg"
import { Platform } from "react-native";


export function AppRoutes(){
  
  //destruturar - pegar apenas oq eu quero do componente, mas nesse caso eu pego o componente do gluestack que consigo pegar todo os estilos de gluestack
   const {tokens} = gluestackUIConfig //lembro aque nesse config tem todos as etilizações
   const iconSize = tokens.space["6"] //defino assim para usar de forma mais pratica para , esse space é o tamaho

    return(
        <Navigator screenOptions={{
          headerShown:false,
          tabBarShowLabel: false, //apagar os texto que aparece em baixo do nome
          tabBarActiveTintColor: tokens.colors.green500 ,//quando eu clicar no icon fica dessa cor
          tabBarInactiveTintColor: tokens.colors.gray200, //quando o icone nao estiver selecionado eu uso essa cor nele
          tabBarStyle:{ //uso apenas para estilizar a barra do BAR
            backgroundColor: tokens.colors.gray500,
            borderTopWidth:0,
            height: Platform.OS === "android" ? "auto": 96,
            paddingBottom: tokens.space["8"],
            paddingTop: tokens.space["8"]
          }
          }}>
            <Screen
              name= "home"
              component={Home}
              options={{
                tabBarIcon: ({color}) => <HomeSvg fill={color}  width={iconSize} height={iconSize}/>
              }}
            />
            <Screen
              name= "history"
              component={History}
              options={{
                tabBarIcon: ({color}) => <HistorySvg fill={color}  width={iconSize} height={iconSize}/>
              }}
            />
            <Screen
              name= "profile"
              component={Profile}
              options={{
                tabBarIcon: ({color}) => <ProfileSvg fill={color}  width={iconSize} height={iconSize}/>
              }}
            />
            <Screen
              name= "exercise"
              component={Exercise}
              options={{tabBarButton:()=> null}} //macete para dizer que quero ter essa rota mais nao quero q ele apareça como um button las no icons
            />
        </Navigator>
    )
}