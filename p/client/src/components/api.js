


// class List {
//     // fetching the data
    
//     async  getRecords(callback) {
//         // console.log(e);
//         const response = await fetch("http://localhost:5000/record/");
//         // console.log("_____________________",response);
//         if (!response.ok) {
    
       
//           return;
//         } else {
//           const records = await response.json();
//            console.log(records);
//           return callback (records)
         
//         }
//       }        
// }
// const list = new List();

// export default list






class List {
    // fetching the data
    
    async  getRecords(callback) {
        // console.log(e);
        const response = await fetch("http://localhost:5000/record/");
        // console.log("_____________________",response);
        if (!response.ok) {
    
       
          return;
        } else {
          const records = await response.json();
          //  console.log(records);
          return callback (records.result)
         
        }
      }        
}
const list = new List();

export default list