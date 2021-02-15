import './App.css';
import tw from 'twin.macro'

function TopContainer() {

  return (
    <MainContainer>

      <ProfileContainer>
        <Image src='ppp.jpeg' />
        <InfoAboutDeveloperContainer>
          <Title>Hakkı ÜLKÜ</Title>
          <No>172010020024</No>
          <Explanation>
            Design and Analysis of Algorithms
          </Explanation>
          <Explanation>Programming Project 1</Explanation>
        </InfoAboutDeveloperContainer>
      </ProfileContainer>



      <ApplicationExplanationContainer>
        <ApplicationTitle>Bellman Ford - Dijsktra - Kosaraju</ApplicationTitle>
        <AppExplanation>
          This application built to simulate Bellman Ford - Dijsktra - Kosaraju algorithms on graphs
        </AppExplanation>
        <AppExplanation></AppExplanation>
        <ExplanationContainer>
          <AppExplanation>
            <Bold>Bellman Ford</Bold> can calculate the shortest path from a given source to every other vertex on the graph. 
            Difference of this from Dijsktra is that this can work with negative weights.
        </AppExplanation>

          <AppExplanation>
            <Bold>Dijsktra</Bold> can calculate the shortest path from a given source to every other vertex on the graph.
        </AppExplanation>

        <AppExplanation>
            <Bold>Kosaraju</Bold> can find the strongly connected components which are the vertex sets 
            where every node is reachable from other nodes in that set.
        </AppExplanation>
        </ExplanationContainer>
      </ApplicationExplanationContainer>

    </MainContainer>

  );
}

export default TopContainer;


// Styled ~ Components //

const MainContainer = tw.div`flex justify-around mb-4`

const ProfileContainer = tw.div`w-2/5 bg-blue-100 shadow-xl rounded-lg p-4
flex items-start`
const Image = tw.img`rounded-full w-32 md:w-64`
const InfoAboutDeveloperContainer = tw.div`ml-16`
const Title = tw.h2`font-bold text-gray-900 text-5xl mt-4`
const No = tw.h3`font-bold text-xl text-gray-600 mt-1 mb-4`
const Explanation = tw.p`font-bold text-blue-800 text-2xl`
const ExplanationContainer = tw.div`flex items-start`

const Bold = tw.p`font-bold text-lg text-blue-900 text-center`

const ApplicationExplanationContainer = tw.div`w-2/5 bg-blue-100 shadow-xl rounded-lg p-4`
const ApplicationTitle = tw.h2`font-bold text-gray-900 text-4xl text-center mb-1`
const AppExplanation = tw.div`font-bold text-blue-800 text-base ml-4 mb-1 text-center`