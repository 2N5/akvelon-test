// function creates a string identifier consisting of 24 characters (letters and numbers)
// example:
// randomId(); // '5ba37c48185c0c98e6880bed'
function randomId() {
  const id =
    Math.random()
      .toString(36)
      .slice(2) +
    Math.random()
      .toString(36)
      .slice(2) +
    Math.random()
      .toString(36)
      .slice(2, 4);
  return id;
}

export default randomId;
