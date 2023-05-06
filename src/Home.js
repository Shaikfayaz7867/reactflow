import React, { useState } from "react";
import ReactFlow, {
  addEdge,
  removeElements,
  Controls,
  MiniMap,
  Background,
} from "react-flow-renderer";

const Home = () => {
  const [elements, setElements] = useState([
    {
      id: "1",
      type: "input",
      data: { label: "Node 1" },
      position: { x: 0, y: 50 },
      style: { backgroundColor: "#E8E8E8" },
    },
    {
      id: "2",
      type: "input",
      data: { label: "Node 2" },
      position: { x: 150, y: 50 },
      style: { backgroundColor: "#E8E8E8" },
    },
    {
      id: "e1-2",
      source: "1",
      target: "2",
      animated: true,
      style: { stroke: "#E8E8E8" },
      arrowHeadType: "arrowclosed",
      label: "Branch",
      labelStyle: { fontSize: 12, fill: "black" },
    },
  ]);
  const [showDelete, setShowDelete] = useState(false);

  const handleAddNode = () => {
    const newElements = [
      ...elements,
      {
        id: (elements.length + 1).toString(),
        type: "input",
        data: { label: `Node ${elements.length + 1}` },
        position: {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        },
        style: { backgroundColor: "#E8E8E8" },
      },
    ];
    setElements(newElements);
  };

  const handleDelete = (id) => {
    const newElements = removeElements([{ id }], elements);
    setElements(newElements);
  };

  const handleConnect = (params) => {
    const newElements = addEdge(
      {
        id: `e${elements.length}-${elements.length + 1}`,
        source: params.source,
        target: params.target,
        animated: true,
        style: { stroke: "#E8E8E8" },
        arrowHeadType: "arrowclosed",
        label: "Branch",
        labelStyle: { fontSize: 12, fill: "black" },
      },
      elements
    );
    setElements(newElements);
  };

  const Node = ({ id, data }) => {
    return (
      <div
        style={{ position: "relative" }}
        onMouseEnter={() => setShowDelete(true)}
        onMouseLeave={() => setShowDelete(false)}
      >
        {showDelete && (
          <div style={{ position: "absolute", top: -10, right: -10 }}>
            <button onClick={() => handleDelete(id)}>X</button>
          </div>
        )}
        <div>{data.label}</div>
      </div>
    );
  };

  const Edge = () => {
    return null;
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <ReactFlow
        elements={elements}
        onConnect={handleConnect}
        nodeTypes={{ input: Node }}
        edgeTypes={{ arrowclosed: Edge }}
      >
        <MiniMap />
        <Controls />
        <Background color="#aaa" />
      </ReactFlow>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          transform: "translateY(-50%)",
        }}
      >
        <button onClick={handleAddNode}>Create node</button>
      </div>
    </div>
  );
};

export default Home;
