$(document).ready(function() {
    document.getElementById('store-service-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        var host = document.getElementById('host').value;
        var name = document.getElementById('name').value;
        var key = document.getElementById('key').value;
    
        var storeService = {
            host: host,
            name: name,
            key: key
        };
    
        // jquery ajax post request to POST - /api/v1/store to post json data
        $.ajax({
            url: '/api/v1/store-services',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(storeService),
            success: function(response) {
                alert('Store Service created successfully');
                //window.location.href = '/store';
                // reload the page to display the new store service
                location.reload();
            },
            error: function(error) {
                alert('Error creating Store Service');
            }
        });
    
    });
    
    /*
    fetch('/api/v1/store-services')
    .then(response => response.json())
    .then(storeServices => {
        var tableBody = document.querySelector('#store-service-table tbody');
    
        storeServices.forEach(storeService => {
            var row = document.createElement('tr');
    
            var nameCell = document.createElement('td');
            nameCell.textContent = storeService.name;
            row.appendChild(nameCell);
    
            var keyCell = document.createElement('td');
            keyCell.textContent = storeService.key;
            row.appendChild(keyCell);
    
            tableBody.appendChild(row);
        });
    });
    */

    // jquery ajax request to GET - /api/v1/store to retrieve json data and populate the table
    $.ajax({
        url: '/api/v1/store-services',
        type: 'GET',
        success: function(response) {
            var tableBody = document.querySelector('#store-service-table tbody');
            response.result.forEach(storeService => {
                var row = document.createElement('tr');
    
                var IDCell = document.createElement('td');
                IDCell.textContent = storeService.id;
                row.appendChild(IDCell);
                
                var nameCell = document.createElement('td');
                nameCell.textContent = storeService.name;
                row.appendChild(nameCell);

                var hostCell = document.createElement('td');
                hostCell.textContent = storeService.host;
                row.appendChild(hostCell);
    
                var keyCell = document.createElement('td');
                keyCell.textContent = storeService.key;
                row.appendChild(keyCell);
    
                tableBody.appendChild(row);
            });
        },
        error: function(error) {
            alert('Error retrieving Store Services');
        }
    });
});


$(document).ready(function () {
    // iterate through li.nav-item elements and append the token to the href attribute. token value is retrieved from url query parameter
    $('li.nav-item').each(function () {
        var href = $(this).find('a').attr('href');
        var token = new URLSearchParams(window.location.search).get('token');
        $(this).find('a').attr('href', href + '?token=' + token);
    });

    $('.navbar-brand').each(function () {
        var href = $(this).attr('href');
        var token = new URLSearchParams(window.location.search).get('token');
        $(this).attr('href', href + '?token=' + token);
    });
});