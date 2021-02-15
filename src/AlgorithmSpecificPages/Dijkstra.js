import '.././App.css';
import tw from 'twin.macro'
import React, { useEffect, useState } from 'react';
import { Graph } from "react-d3-graph";
import { Graphh} from '.././utils/DijkstraAlgorithm'
import { produceGraphVisualisation} from '.././utils/BellmanFordAlgorithm'

function Dijkstra() {

    const [graphData, setGraphData] = useState({ links: [], nodes: [{ id: "empty yet" }] })
    const [graph, setGraph] = useState()
    const [graphVertices, setGraphVertices] = useState(0)
    const [target, setTarget] = useState("")
    const [distances, setDistances] = useState({})
    const [source, setSource] = useState("")
    const [weight, setWeight] = useState("")
    const [vertices, setVertices] = useState([])

    // the graph configuration, just override the ones you need
    const myConfig = {
        nodeHighlightBehavior: true,
        directed: true,
        node: {
            color: "lightgreen",
            size: 120,
            highlightStrokeColor: "blue",
        },
        link: {
            highlightColor: "lightblue",
        },
    };

    const onClickNode = function (nodeId) {
        window.alert(`Clicked node ${nodeId}`);
    };

    const onClickLink = function (source, target) {
        window.alert(`Clicked link between ${source} and ${target}`);
    };

    function handleAddEdge() {
        let s = parseInt(source)
        let t = parseInt(target)
        let w = parseInt(weight)

        if (isNaN(s) || isNaN(t) || isNaN(w)) {
            alert("Please enter as numbers to the source, target and weight")
            return
        }

        let newVertices = vertices
        newVertices.push([s, t, w])

        setVertices(newVertices)

        setSource("")
        setTarget("")
        setWeight("")

        console.log(newVertices)
    }

    function handleProduceGraph() {
        let nds = []
        for (let i = 0; i < vertices.length; i++) {
            if(!nds.includes(vertices[i][0])) {
                nds.push(vertices[i][0])
            }
            if(!nds.includes(vertices[i][1])) {
                nds.push(vertices[i][1])
            }
        }

        console.log(nds.length)


        let gr = new Graphh(nds.length)
        for (const n of vertices) {
            gr.addEdge(n[0], n[1], n[2])
        }



        let [nodes, links] = produceGraphVisualisation(gr.graph)
        setGraphData({ nodes, links })

        setGraph(gr)

        
    }

    function handleDijkstra() {

        let src = prompt("Please enter the source vertex to calculate Dijkstra")

        let dist = graph.dijkstra(parseInt(src))
        setDistances(dist)
    }



    return (
        <BellmanContainer>
            <Container>
                <Inputs>
                    <div><Span>source: </Span><Input placeholder="Source" value={source} onChange={e => setSource(e.target.value)} /></div>
                    <div><Span>target: </Span><Input placeholder="Target" value={target} onChange={e => setTarget(e.target.value)} /></div>
                    <div><Span>weight: </Span><Input placeholder="Weight" value={weight} onChange={e => setWeight(e.target.value)} /></div>
                </Inputs>
                <Buttons>
                    <Button onClick={() => handleAddEdge()}>Add Edge</Button>
                    <Button onClick={() => handleProduceGraph()}>Produce Graph</Button>
                    <Button onClick={() => handleDijkstra()}>Dijkstra</Button>
                </Buttons>

                <TableContainer>
                    <InfoTable>
                        <InfoRow>
                            <InfoHeader>Source</InfoHeader>
                            <InfoHeader>Target</InfoHeader>
                            <InfoHeader>Weight</InfoHeader>
                        </InfoRow>
                        {vertices && vertices.map(g => (
                            <InfoRow1 key={g[0] + g[1] + g[2]}>
                                <InfoData>{g[0]}</InfoData>
                                <InfoData>{g[1]}</InfoData>
                                <InfoData>{g[2]}</InfoData>
                            </InfoRow1>
                        ))}
                    </InfoTable>

                </TableContainer>

                <TableContainer>
                    <TableInfo>Result of Dijkstra</TableInfo>
                    <InfoTable>
                        <InfoRow>
                            <InfoHeader>Vertex</InfoHeader>
                            <InfoHeader>Distance from source</InfoHeader>
                        </InfoRow>
                        {distances && Object.entries(distances).map(entry => (
                            <InfoRow1 key={entry}>
                                <InfoData>{entry[0]}</InfoData>
                                <InfoData>{entry[1]}</InfoData>
                            </InfoRow1>
                        ))}
                    </InfoTable>

                </TableContainer>


            </Container>



            {graphData.links.length !== 0 && <Graph
                id="graph-id" // id is mandatory
                data={graphData}
                config={myConfig}
            />}

        </BellmanContainer>
    );
}

const BellmanContainer = tw.div`bg-blue-100 font-sans`
const Container = tw.div`flex items-start justify-around`

const Inputs = tw.div`flex flex-col`
const Input = tw.input`overflow-auto max-w-lg rounded-lg`
const Span = tw.span``

const Buttons = tw.div`flex flex-col`
const Button = tw.button`px-2 py-3 border-none hover:cursor-pointer focus:outline-none
rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold mb-2`

const TableContainer = tw.div`flex flex-col rounded overflow-auto max-h-64 h-64`
const TableInfo = tw.h2`font-bold mb-1 text-center`

const InfoTable = tw.table`table-auto bg-gray-100 text-center`
const InfoRow = tw.tr``
const InfoRow1 = tw.tr`bg-gray-300`
const InfoRow2 = tw.tr``
const InfoHeader = tw.th`bg-gray-200 font-bold px-4 py-2`
const InfoData = tw.td``




export default Dijkstra;
