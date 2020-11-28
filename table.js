function Add(){
    var name = $('#name').val();
    var email = $('#email').val();
    var mobileNumber = $('#mobile-number').val();
    var id = GetRowId();
    $('#table-content').append(
        $('<div class="row main-row" id="row-'+id+'">').append(
            $('<div class="col-3">').append(
                $('<div class="row">').append(
                    $('<input class="form-control col-10" id="row-name-'+id+'" value="'+name+'" disabled />')
                )
            )
        ).append (
            $('<div class="col-3">').append(
                $('<div class="row">').append(
                    $('<input class="form-control col-10" id="row-email-'+id+'" value="'+email+'" disabled />')
                )
            )
        ).append(
            $('<div class="col-3">').append(
                $('<div class="row">').append(
                    $('<input class="form-control col-10" id="row-mobilenumber-'+id+'" value="'+mobileNumber+'" disabled />')
                )
            )
        ).append(
            $('<div class="col-3">').append(
                $('<div class="row">').append(
                    $('<button id="row-edit-'+id+'" class="btn btn-warning" onclick="Edit('+id+');" editing=false >Edit</button>')

                ).append(
                    $('<button id="row-delete-'+id+'" class="btn btn-danger" onclick="Delete('+id+')"  >Delete</button>')
                )
            )
        )
    )
    CreateContact(id);
}

function List(){
    var registries = ListContacts();
    for(i = 0; i < registries.length; i++)
    {
        addRow(registries[i]);
    }
}

function Get(){
    console.log($("#Search").val());
    var id = parseInt($("#Search").val());
    var registry = GetContact(id);
    $('#table-content').append(
        $('<div class="row main-row" id="row-'+id+'">').append(
            $('<div class="col-3">').append(
                $('<div class="row">').append(
                    $('<input class="form-control col-10" id="row-name-'+registry.id+'" value="'+registry.name+'" disabled />')
                )
            )
        ).append (
            $('<div class="col-3">').append(
                $('<div class="row">').append(
                    $('<input class="form-control col-10" id="row-email-'+registry.id+'" value="'+registry.email+'" disabled />')
                )
            )
        ).append(
            $('<div class="col-3">').append(
                $('<div class="row">').append(
                    $('<input class="form-control col-10" id="row-mobilenumber-'+registry.id+'" value="'+registry.mobileNumber+'" disabled />')
                )
            )
        ).append(
            $('<div class="col-3">').append(
                $('<div class="row">').append(
                    $('<button id="row-edit-'+id+'" class="btn btn-warning" onclick="Edit('+registry.id+');" editing=false >Edit</button>')

                ).append(
                    $('<button id="row-delete-'+id+'" class="btn btn-danger" onclick="Delete('+registry.id+')"  >Delete</button>')
                )
            )
        )
    )

}

function addRow(registry){
    var id = GetRowId();
    
    $('#table-content').append(
        $('<div class="row main-row" id="row-'+id+'">').append(
            $('<div class="col-3">').append(
                $('<div class="row">').append(
                    $('<input class="form-control col-10" id="row-name-'+registry.id+'" value="'+registry.name+'" disabled />')
                )
            )
        ).append (
            $('<div class="col-3">').append(
                $('<div class="row">').append(
                    $('<input class="form-control col-10" id="row-email-'+registry.id+'" value="'+registry.email+'" disabled />')
                )
            )
        ).append(
            $('<div class="col-3">').append(
                $('<div class="row">').append(
                    $('<input class="form-control col-10" id="row-mobilenumber-'+registry.id+'" value="'+registry.mobileNumber+'" disabled />')
                )
            )
        ).append(
            $('<div class="col-3">').append(
                $('<div class="row">').append(
                    $('<button id="row-edit-'+id+'" class="btn btn-warning" onclick="Edit('+registry.id+');" editing=false >Edit</button>')

                ).append(
                    $('<button id="row-delete-'+id+'" class="btn btn-danger" onclick="Delete('+registry.id+')"  >Delete</button>')
                )
            )
        )
    )
}

function GetNameInput(id){
    return $('#row-name-' + id);
}

function GetAuthorInput(id){
    return $('#row-email-' + id);
}

function GetReleaseDateInput(id){
    return $('#row-mobilenumber-' + id);
}

function EditButton(id){
    return $('#row-edit-' + id);
}

function GetRowId(){
    var Table = $('#Table');
    var count = Table.children().length;
    var id = count + 1;

    while(GetRow(id)[0] != null)
    {
        id++;
    } return id;
}

function GetRow(id){
    return $('#row-'+id);
}

function Edit(id){
    var editButton = EditButton(id);
    if(editButton.attr('editing') == "true"){
        editButton.attr('editing', false);
        editButton.text('Edit');
        Disable(GetNameInput(id));
        Disable(GetAuthorInput(id));
        Disable(GetReleaseDateInput(id));
    }else{
        editButton.attr('editing', true);
        editButton.text('Save');
        Enable(GetNameInput(id));
        Enable(GetAuthorInput(id));
        Enable(GetReleaseDateInput(id));
    }
    UpdateContact(id);
}

function Delete(id){
    GetRow(id).remove();
    DeleteContact(id);
}

function Disable(element){
    element.attr('disabled', true);
}

function Enable(element){
    element.attr('disabled', false);
}
function GetContactFromForm(){
    var name = $('#name').val();
    var email = $('#email').val();
    var mobileNumber = $('#mobile-number').val();
    return{
        name: name,
        email: email,
        mobileNumber: mobileNumber
    }
}

function CreateContact(){
    var response = null;
    console.log(GetContactFromForm());
    console.log(JSON.stringify(GetContactFromForm()));
    $.ajax({
        url: "https://localhost:5001/api/Contacts/create",
        contentType: "application/json",
        method: "POST",
        async: false,
        data: JSON.stringify(GetContactFromForm()),
        success: function(data) {
            response = data;
        },
        error: function(er) {
            alert("error lol u dumb")
            console.log(er)

        }
    });
    return response;
}

function DeleteContact(id){
    var response = null;
    $.ajax({
        url: "https://localhost:5001/api/Contacts/delete?id="+ id,
        method: "DELETE",
        async: false,
        success: function(data) {
            response = data;
        },
        error: function(er) {
            alert("error lol u dumb")
            console.log(er)

        }
    });  
    return response;
}

function ListContacts(){
    var response = null;
    $.ajax({
        url: "https://localhost:5001/api/Contacts/list",
        method: "GET",
        async: false,
        success: function(data) {
            response = data;
        },
        error: function(er) {
            alert("error lol u dumb")
            console.log(er)

        }
    });  
    return response;
}

function UpdateContact(id){
    var response = null;
    $.ajax({
        url: "https://localhost:5001/api/Contacts/update?id="+ id,
        method: "PUT",
        data: GetContactFromForm(),
        async: false,
        success: function(data) {
            response = data;
        },
        error: function(er) {
            alert("error lol u dumb")
            console.log(er)

        }
    });  
    return response;
}

function GetContact(id){
    var response = null;
    $.ajax({
        url: "https://localhost:5001/api/Contacts/get?id="+ id,
        method: "GET",
        async: false,
        success: function(data) {
            response = data;
        },
        error: function(er) {
            alert("error lol u dumb")
            console.log(er)

        }
    });  
    return response;
}