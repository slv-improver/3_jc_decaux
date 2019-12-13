class Form {
    constructor(element) {
        this.address = element.address;
        this.available_bike_stands = element.available_bike_stands;
        this.available_bikes = element.available_bikes;
        this.submit = document.getElementById('booking');
        this.showForm();
    }

    showForm() {
        document.getElementById('station').style.display = 'block';
        document.getElementById('address').textContent = this.address;
        document.getElementById('places').textContent = this.available_bike_stands;
        document.getElementById('available').textContent = this.available_bikes;
        this.bookingListener();
    }

    bookingListener() {
        this.submit.addEventListener('click', () => {
            this.submit.insertAdjacentText('afterend', 'Veuillez signer puis valider');
            this.canvas = new Canvas(document.getElementById("canvas"));
        });
    }
}