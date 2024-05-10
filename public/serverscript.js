async function submitDonorForm() {
    const name = document.getElementById('donor-name').value;
    const phone = document.getElementById('donor-phone').value;
    const foodQuantity = document.getElementById('donor-food-quantity').value;
    const address = document.getElementById('donor-address').value;
    const city = document.getElementById('donor-city').value;

    try {
        const response = await fetch('/donor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, phone, foodQuantity, address, city })
        });

        const data = await response.json();
        alert(data.message);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function getAvailableDonors() {
    const password = prompt("Enter password:");
    if (password === "temp123") {
        try {
            const response = await fetch('/donors');
            const data = await response.json();
    
            const availableDonorsTable = document.createElement('table');
            availableDonorsTable.style.borderCollapse = 'collapse'; // Collapse borders
            availableDonorsTable.style.width = '100%'; // Make table full width
            availableDonorsTable.style.border = '2px solid #ddd'; // Add border
            availableDonorsTable.innerHTML = `
                <tr>
                    <th style="border: 1px solid black; padding: 8px;">Name</th>
                    <th style="border: 1px solid black; padding: 8px;">Phone</th>
                    <th style="border: 1px solid black; padding: 8px;">Food Quantity</th>
                    <th style="border: 1px solid black; padding: 8px;">Address</th>
                    <th style="border: 1px solid black; padding: 8px;">City</th>
                </tr>
            `;
    
            data.forEach(donor => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td style="border: 1px solid black; padding: 8px;">${donor.name}</td>
                    <td style="border: 1px solid black; padding: 8px;">${donor.phone}</td>
                    <td style="border: 1px solid black; padding: 8px;">${donor.foodQuantity}</td>
                    <td style="border: 1px solid black; padding: 8px;">${donor.address}</td>
                    <td style="border: 1px solid black; padding: 8px;">${donor.city}</td>
                `;
                availableDonorsTable.appendChild(row);
            });
    
            const resultsParagraph = document.querySelector('.results');
            resultsParagraph.innerHTML = '';
            resultsParagraph.appendChild(availableDonorsTable);
        } catch (error) {
            console.error('Error:', error);
        }
    } else {
        // Incorrect password, show an alert
        alert("Incorrect password. Please try again.");
    }
}
