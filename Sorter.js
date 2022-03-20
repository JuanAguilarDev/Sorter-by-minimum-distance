// Matrix
var matrix = [[[1],[0],[1]], [[1],[1],[1]], [[1],[2],[2]], [[-1],[1],[2]], [[0],[0],[2]], [[3],[1],[3]], [[0],[1],[3]]]; 

// x
var x = [[1],[-1]];




// Numero de prototipos n1, n2... n
var prototypes = [];
var classes = [];
var number = [];
var values = [];

// We get all the classes contained in the arrayWe get all the classes contained in the array
for(let i = 0; i<matrix.length; i++){
    number.push(matrix[i][2]);
}

// Number of clases
number = convertArr(number);

// Number of elements for each class
classes = convertArr(filterArray(number));
findPrototypesNumber(classes, number);

// Separate the classes
function filterArray(inputArr){
    var found ={};
    var out = inputArr.filter(function(element){
        return found.hasOwnProperty(element)? false : (found[element]=true);
    });
    return out;
}

// We gonna convert an bidimensional array
function convertArr(arr){
    var newArr = [];
    for(var i = 0; i < arr.length; i++)
    {
        newArr = newArr.concat(arr[i]);
    }
    return newArr;
}

// Find the number of elements for each class
function findPrototypesNumber(classes, numbers){
    for(let i = 0; i<classes.length; i++){
        let count = 0;
        numbers.forEach(e => {
            if(e == classes[i]){
                count++;
            }
        });
        prototypes.push(count);
    }
} 


// Do the operation
function calculateValue(x, matrix){ 
    let values = [];
    let element = [];
    for(let i=0; i<matrix.length; i++){    
        let value = multiplyM(transposed(x), [matrix[i][0], matrix[i][1]]) - 0.5*(multiplyM(transposed([matrix[i][0], matrix[i][1]]), [matrix[i][0], matrix[i][1]]));                    
        element = element.concat([value], matrix[i][2]);
        values.push(element);
        element = [];
    }

    return values; 
}

// Calculate the class for the x
function calculateClass(arr){
    let newArr = [arr.length];
    let max; 
    let cl; 
    for(let i = 0; i<arr.length; i++){
        newArr[i] = arr[i][0];
    }
    max = Math.max(...newArr);
    for(let j = 0; j<arr.length; j++){
        if(max == arr[j][0]){
            cl = arr[j][1];      
        }
    }
    
    console.log("El valor maximo es: " + max + " por lo que el patron pertenece a la clase: " + cl);
}


//We are going to multiply the vectors
function multiplyM(arr1, arr2){
    arr1_rows = arr1.length;
    arr1_cols = arr1[0].length;
    arr2_rows = arr2.length;
    arr2_cols = arr2[0].length;
    if(arr1_cols != arr2_rows){
        console.log("No se puede efectuar la operación. ");
        return null;
    }else{
        let newM = [arr1_rows];
        // Fill the new matrix with 0
        for(let i = 0; i<newM.length; i++){
            newM[i] = new Array(arr2_cols).fill(0);
        }
        // Operation
        for(let i=0; i<newM.length; i++){
            for(let j=0; j<newM[i].length; j++){
                for(let k=0; k<arr1_cols; k++){
                    newM[i][j] += arr1[i][k] * arr2[k][j]; 
                }
            }
        }
        return newM;
    }
}

// Transposed Matrix
function transposed(arr){
    let nElements = arr.length;
    let newM = []; 
    for(let i = 0; i<nElements; i++){
        newM = newM.concat(arr[i]);
    }
    return [newM];
}


// Ejecution

// Dimension
var n = matrix[0].length-1; 

// Number of classes
var m = classes.length;

console.log("Dimensión: ", n, " Clases: ", m);
console.log("Clases presentes en los datos: " + classes);
console.log("Prototipos por cada clase: " + prototypes);


calculateClass(calculateValue(x, matrix));