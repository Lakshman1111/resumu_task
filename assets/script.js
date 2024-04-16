var resumes = [];
var test = []

function uploadResumes() {
    var input = document.getElementById('resumeInput');
    var files = input.files;

    for (var i = 0; i < files.length; i++) {
        var resume = {
            id: resumes.length + 1, // Generate unique ID for each resume
            name: files[i].name, // Get the name of the uploaded file
            fileType: files[i].name.split('.').pop(), // Extract file extension
            uploadedAt: new Date().toISOString(), // Get current timestamp
            validated: false // Set validated status to false initially
        };
        
        // Add the resume to the array
        resumes.push(resume);

        // Log the uploaded resume
        console.log('Resume uploaded:', resume);

        // You can also make an API call to send the resume data to the server
    }

    // After uploading, update the UI to display the uploaded resumes
    displayResumes();
}


function displayResumes() {
    var tableBody = document.querySelector('#resumesTable tbody');
    tableBody.innerHTML = ''; // Clear the table body

    resumes.forEach(function(resume) {
        var row = '<tr><td><input type="checkbox" value="' + resume.id + '"></td><td>' + resume.name + '</td></tr>';
        tableBody.innerHTML += row;
    });
}


// Call the displayResumes function initially to show any existing resumes
displayResumes();


// Modify getSelectedResumes() to push resume IDs
// Modify getSelectedResumes() to push resume IDs
function getSelectedResumes() {
    var selectedRows = [];
    var table = document.getElementById('resumesTable');
    var rows = table.getElementsByTagName('tr');

    // Check if resumes array is not empty
    if (resumes.length > 0) {
        // Check each row for selection
        for (var i = 0; i < rows.length; i++) {
            var checkbox = rows[i].querySelector('input[type="checkbox"]');
            if (checkbox && checkbox.checked) {  // Check if checkbox exists and is checked
                var resumeId = parseInt(checkbox.value); // Parse the value as integer
                selectedRows.push(resumeId); // Push resume ID
            }
        }
    }

    return selectedRows;
}



function validateResumes() {
    var selectedResumeIds = getSelectedResumes();

    if (selectedResumeIds.length === 0) {
        console.log("No resumes selected for validation.");
        return;
    }
debugger
    selectedResumeIds.forEach(function(resumeId) {
        // Find the resume object by ID
        var resume = resumes.find(function(resume) {
            return resume.id === resumeId;
        });

        if (resume) {
            // Debugging statement
            console.log('Validating resume:', resume.id, '-', resume.name);

            // Mark the resume as validated
            resume.validated = true;
            test.push(resume)

            // Move the validated resume to the validated resumes table
            moveResumeToValidatedTable(resume);
        }
    });

    // Remove validated resumes from the main table
    removeSelectedResumes(selectedResumeIds);
}



function moveResumeToValidatedTable() {
    var tableBody = document.querySelector('#validatedResumesTable tbody');
    tableBody.innerHTML = ''; // Clear the table body

    test.forEach(function(resume1) {
        var row = '<tr><td><input type="checkbox" value="' + resume1.id + '"></td><td>' + resume1.name + '</td></tr>';
        tableBody.innerHTML += row;
    });
    // var newRow = tableBody.insertRow();
    // var cell1 = newRow.insertCell(0);
    // cell1.innerHTML = '<input type="checkbox" value="' + resume.id + '">';
    // var cell2 = newRow.insertCell(1);
    // cell2.textContent = resume.name;
}

// Function to display validated resumes in a separate table
// Function to display validated resumes in a separate table
function displayValidatedResumes(validatedResumes) {
    var tableBody = document.querySelector('#validatedResumesTable tbody');
    
    // Clear the table body first
    tableBody.innerHTML = '';
debugger
    validatedResumes.forEach(function(resume) {
        if (resume && resume.name) { // Check if the resume object and its name property are defined
            var row = '<tr><td>' + resume.name + '</td></tr>';
            tableBody.innerHTML += row;
        }
    });
}

// Function to remove selected resumes from the main table
function removeSelectedResumes(selectedResumeIds) {
    selectedResumeIds.forEach(function(resumeId) {
        // Find the index of the resume with the given ID
        var index = resumes.findIndex(function(resume) {
            return resume.id === resumeId;
        });

        // If the resume with the given ID is found, remove it from the array
        if (index !== -1) {
            resumes.splice(index, 1);
        }
    });

    // Update the UI to display remaining resumes in the main table
    displayResumes();
}
function getSelectedValidatedResumes() {
    var selectedRows = [];
    var table = document.getElementById('validatedResumesTable');
    var rows = table.getElementsByTagName('tr');

    // Check if resumes array is not empty
    if (rows.length > 0) {
        // Check each row for selection
        for (var i = 0; i < rows.length; i++) {
            var checkbox = rows[i].querySelector('input[type="checkbox"]');
            if (checkbox && checkbox.checked) {  // Check if checkbox exists and is checked
                var resumeId = parseInt(checkbox.value); // Parse the value as integer
                selectedRows.push(resumeId); // Push resume ID
            }
        }
    }

    return selectedRows;
}


function communicateWithResumes() {
    debugger
    var selectedValidatedResumes = getSelectedValidatedResumes();

    if (selectedValidatedResumes.length === 0) {
        console.log("No validated resumes selected for communication.");
        return;
    }

    console.log("Selected validated resumes:", selectedValidatedResumes);

    selectedValidatedResumes.forEach(function(resumeId) {
        test = test.filter(i=>i.id!=resumeId);

        // if (resume) {
        //     console.log("Communicating with: " + resume.name);
        //     removeSelectedResumesFromValidatedTable(resume); // <-- Change this line
        // }
    });
    moveResumeToValidatedTable()
}


function removeSelectedResumesFromValidatedTable(selectedResumes) {
    debugger
    test.filter(i=>i.id!=selectedResumes.id);

    selectedResumes.forEach(function(resume) {
        var tableBody = document.querySelector('#validatedResumesTable tbody');
        console.log("Table body:", tableBody);

        var checkbox = tableBody.querySelector('input[type="checkbox"][value="' + resume.id + '"]');
        console.log("Checkbox:", checkbox);

        if (checkbox) {
            var rowToRemove = checkbox.closest('tr');
            console.log("Row to remove:", rowToRemove);

            if (rowToRemove) {
                rowToRemove.parentNode.removeChild(rowToRemove); // Remove the row from the table
            }
        }
    });
}








// Function to remove selected resumes from the validated resumes table
// function removeSelectedResumesFromValidatedTable(selectedResumes) {
//     selectedResumes.forEach(function(resume) {
//         var tableBody = document.querySelector('#validatedResumesTable tbody');
//         var rowToRemove = tableBody.querySelector('td:contains("' + resume.name + '")').parentNode;
//         if (rowToRemove) {
//             rowToRemove.parentNode.removeChild(rowToRemove); // Remove the row from the table
//         }
//     });
// }



