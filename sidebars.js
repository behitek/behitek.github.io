module.exports = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{ type: 'autogenerated', dirName: '.' }],
  docs: [
    {
      type: "doc",
      id: "index",
    },
    {
      type: "category",
      label: "Data Structures",
      items: [
        "data-structures/stack",
        "data-structures/queue",
        "data-structures/linkedlist",
        "data-structures/hash-table",
      ]
    },
    {
      type: "category",
      label: "Algorithms",
      items: [
        "algorithms/bfs",
        "algorithms/dfs",
      ]
    }
  ]
};
