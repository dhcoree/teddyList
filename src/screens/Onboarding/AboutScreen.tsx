import { ScrollView, StyleSheet, Text, View } from "react-native";
import Container from "../../components/Container";
import Spacer from "../../components/Spacer";

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 50,
        marginBottom: 146,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        color: '#1A261C'
    },
    text: {
        textAlign: 'justify',
        fontSize: 14,
    },
    code: {
        fontFamily: 'monospace',
        backgroundColor: '#f0f0f0',
        padding: 8,
        borderRadius: 4,
    },
});

const AboutScreen = () => {
    return ( 
        <Container>
            <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>

                    <Text style={styles.title}>Descrição do projeto</Text>

                    <Spacer size={16} />

                    <Text style={styles.text}>O projeto foi feito com react native padrão na versão <Text style={styles.code}>Node v18.17.0</Text>, criado com <Text style={styles.code}>npx react-native init</Text> e usando <Text style={styles.code}>Typescript</Text> para assegurar melhor a tipagem dos dados e as bibliotecas foram implementadas conforme a necessidade. No projeto foi incialmente criado a tela de login junto aos componentes como TextInput, Buttton e Checkbox. A partir disso foi criado a validação simples de logIn usando o checkbox para manter salvo o logIn no <Text style={styles.code}>AccountStorage</Text> entrando na tela inicial quando habilitado. 
                    </Text>

                    <Spacer size={10} />

                    <Text style={styles.text}>Após a finalização da tela de login foi instalada a biblioteca de <Text style={styles.code}>React Navigation</Text> para criar as rotas e também o <Text style={styles.code}>bottom tab bar</Text>. A bottom tab bar foi um componente personalizado para termos um menu flutuante pela tela, facilitando a troca de visibilidade da tela de <Text style={styles.code}>Parceiros</Text> e <Text style={styles.code}>Empresas externas</Text>.
                    </Text>

                    <Spacer size={10} />

                    <Text style={styles.text}>Também foi adicionado um <Text style={styles.code}>FlatList</Text> com os itens a serem lidos pela API, via <Text style={styles.code}>services</Text> trazendo os dados separados de <Text style={styles.code}>Parceiros</Text> e <Text style={styles.code}>Empresas externas</Text> com seus <Text style={styles.code}>context</Text>. Junto a lista foi adicionado os cards com botões de <Text style={styles.code}>editar</Text> e <Text style={styles.code}>excluir</Text>. Na listagem é possível também fazer um <Text style={styles.code}>filtro</Text> para pesquisas.
                    </Text>

                    <Spacer size={10} />

                    <Text style={styles.text}>Ainda na tela onde visualizamos tanto <Text style={styles.code}>Parceiros</Text> e <Text style={styles.code}>Empresas externas</Text> no topo da tela tem a opção de <Text style={styles.code}>criar</Text> para empresas externas quanto para parceiros. No mesmo header temos também a opção de <Text style={styles.code}>sair</Text> conforme os requisitos.
                    </Text>

                    <Spacer size={10} />

                    <Text style={styles.text}>Por fim depois de atender os requisitos do teste foi criada a tela <Text style={styles.code}>Sobre a aplicação</Text> com a descrição breve sobre o projeto.
                    </Text>

                    <Spacer size={16} />

                    <Text style={styles.title}>Intuito do projeto</Text>

                    <Spacer size={16} />

                    <Text style={styles.text}>A ideia principal do projeto é testar o <Text style={styles.code}>CRUD</Text> que são as <Text style={styles.code}>leituras</Text> dos dados via API, <Text style={styles.code}>criar</Text>, <Text style={styles.code}>editar</Text> e <Text style={styles.code}>deletar</Text> os dados. O intuito é visualizar a trazer de forma dinâmica os dados persistentes da API em formato de listagem podendo interagir com eles dessa forma.
                    </Text>

                </View>
            </ScrollView>
        </Container>
    );
}

export default AboutScreen;