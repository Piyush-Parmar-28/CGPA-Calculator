/* The queryselector in js selects & returns the first css selector available in the document. */

/* Declaring const variables for our various ID's */

/* 1. Buttons */
const add= document.querySelector("#add");    /* The parenthesis contains the id= add */
const calcGp= document.querySelector("#calc-gp");
const clear= document.querySelector("#clear");

/* 2. Input columns */
const courseCode= document.querySelector("#course-code");
const unitLoad= document.querySelector("#unit-load");
const grade= document.querySelector("#grade");

/* 3. Table contents */
const tbody= document.querySelector("#tbody");
const tfoot= document.querySelector("#tfoot");
const table= document.querySelector("#table");


/* Using the 'let' variable to create an array */
/*  1. Variables defined with let must be Declared before use.
    2. Variables defined with let cannot be Redeclared.
    3. Variables defined with let have Block Scope, i.e., scope within {}. */

    let gpArray= [];   /* This array will hold the value of unit load & the grade at every index. */ 

/* Adding event listeners to the const variables */
/* The document.addEventListener() method attaches an event handler to the document. */

/* Comaprision b/w different comparators 
    1. = : Assignment operator
    2. == : Compares data & reference
    3. === : Comapres data, reference & data type */

/* Creating event when add button is clicked  */   
add.addEventListener("click", () =>{
    if(courseCode.value === "" || unitLoad.value <=0 || grade.selectedIndex === 0){
        alert("Incorrect Input!\nTry Again");
    }

    else{
        /* The createElement() method creates an Element Node with the specified name. */
        /* var btn = document.createElement("BUTTON"); -> This creates a BUTTON element named btn */
        
        /* Creating Table Row (tr) element */
        const tr= document.createElement("tr");

        /* Creating element for cell of the table (td) */
        const tdCourseCode= document.createElement("td");
        tdCourseCode.innerHTML= courseCode.value;

        const tdUnitLoad= document.createElement("td");
        tdUnitLoad.innerHTML= unitLoad.value;

        const tdGrade= document.createElement("td");
        tdGrade.innerHTML= grade.options[grade.selectedIndex].text;

        /* The appendChild() method appends a node as the last child of a node. */
        /* Hence, we are using appendChild to append table rows to the previous table. */
        tr.appendChild(tdCourseCode);
        tr.appendChild(tdUnitLoad);
        tr.appendChild(tdGrade);
        tbody.appendChild(tr);

        /* Now we want that our table & buttons to get displayed, which were earlier hidden by the class 'display-none' */
        table.classList.remove("display-none");     /* We have a classList which contains all the classes corresponding of the table tag. From that classList, remove the class 'display-none'. */
        calcGp.classList.remove("display-none");
        clear.classList.remove('display-none');

        /* Pushing Unit Load & Grades into gpArray */
        /* Hence, at every index, the array will have two elements in it: Unit Load & Grade. */
        gpArray.push({
            unitLoad: unitLoad.value,   /* Storing the value of unitLoad in unitLoad variable. */
            grade: grade.options[grade.selectedIndex].value,    /* Storing the numerical value of the selected grade in grade variable. */
        });

        /* Resetting the input columns after addition of one table row */
        courseCode.value= "";
        unitLoad.value= "";
        grade.selectedIndex= "0";
    }
});


/* Creating event when Calculate GP button is clicked */
/* Declaring a call back function. I.e., after the click event is performed, the function will be executed. */
calcGp.addEventListener("click", () => {
    let unitLoads= 0;
    let totalUnitLoad= 0;
    let productOfUnitLoadsAndGrades= 0;
    let sumOfProductOfUnitLoadsAndGrades= 0;

    /* Declaring a call back function, with parameter as result. */
    /* Here, the parameter 'result' acts as index counter of the array. */
    gpArray.forEach((result) =>{
        /* parseInt returns the first integer from a 'STRING', since the data we have stored in our array is in the form if integer. */
    
        unitLoads= parseInt(result.unitLoad);
        totalUnitLoad= totalUnitLoad+ parseInt(result.unitLoad);

        productOfUnitLoadsAndGrades= parseInt(result.unitLoad) * parseInt(result.grade);
        sumOfProductOfUnitLoadsAndGrades = sumOfProductOfUnitLoadsAndGrades + productOfUnitLoadsAndGrades;
    });

    var cgpa= sumOfProductOfUnitLoadsAndGrades / totalUnitLoad;

    /* Creating a table row variable. */
    const tr= document.createElement("tr");

    /* Creating a table cell element to display Total Unit Load */
    tdTotalUnitLoad= document.createElement("td");

    /* Displaying the Total Unit Load */
    tdTotalUnitLoad.innerHTML= 'Total Unit Load is: ' + totalUnitLoad;

    /* Creating a table cell element to display CGPA */
    tdGpa= document.createElement("td");

    /* Setting the width of the CGPA cell */
    tdGpa.setAttribute("colspan", "2");

    /* Displaying the CGPA */
    tdGpa.innerHTML= 'Your CGPA is: '+ cgpa.toFixed(2);
    /* toFixed(2) rounds off the number to specified the specified number of decimals & fimally converts it into string. */

    /* Finally, adding (appending) the new row to the original row, which contains the total unit load & CGPA */
    tr.appendChild(tdTotalUnitLoad);
    tr.appendChild(tdGpa);

    /* In case, if we add a new entry to our table after calculating the CGPA once, then we want that the old CGPA row gets deleted & only the new row remains. */
    /* Hence, we are deleting the previous row, which displayed old CGPA. */
    if(tfoot.querySelector("tr") != null){
        tfoot.querySelector("tr").remove();
    }

    /* Now, we want to append the complete row in the footer of the table (tfoot) */
    tfoot.append(tr);
})


/* Creating event when Clear button is clicked */
clear.addEventListener("click", () => {
    /* Pehle, array me jo data stored tha, usko khaali karo. */
    gpArray= [];

    /* The querySelectorAll() method returns all elements in the document that matches a specified CSS selector(s). */
    
    /* Removing all the child elements of the table body. */
    /* The child elements of the table body contains all the table elements, except the table footer (tfoot), which contains the Total Unit Load & CGPA. */
    tbody.querySelectorAll("*").forEach((child) => child.remove());

    /* Removing the table footer (tfoot) seperately. */
    /* We want the table footer to be removed only if it is present in the table. */
    /* It is because, if the table footer is not present n the table, then how can we remove it. */
    
    if (tfoot.querySelector("tr") != null) {
        /* Clearing the footer of the table (tfoot), if its not empty. */
        tfoot.querySelector("tr").remove();
    }

    /* Adding the 'display-none' class again to the table, calcGp & clear elements. */
    /* Try karo ki kya sirf in teen lines se hi kaam ho jaayega kya?? */
    table.classList.add("display-none");
    calcGp.classList.add("display-none");
    clear.classList.add("display-none");
})