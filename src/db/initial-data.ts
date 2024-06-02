const users = [
    {
        "name": {
            "first": "John",
            "middle": "A.",
            "last": "Doe"
        },
        "phone": "0501234567",
        "email": "john.doe@example.com",
        "password": "SecurePass!123",
        "address": {
            "state": "NY",
            "country": "USA",
            "city": "New York",
            "street": "Broadway",
            "houseNumber": 100,
            "zip": "10001"
        },
        "isBusiness": false
    },
    {
        "name": {
            "first": "Jane",
            "middle": "B.",
            "last": "Smith"
        },
        "phone": "0523456789",
        "email": "jane.smith@example.com",
        "password": "MyPass!456",
        "address": {
            "state": "CA",
            "country": "USA",
            "city": "Los Angeles",
            "street": "Sunset Blvd",
            "houseNumber": 200,
            "zip": "90001"
        },
        "isBusiness": true
    },
    {
        "name": {
            "first": "Alice",
            "middle": "C.",
            "last": "Johnson"
        },
        "phone": "0534567890",
        "email": "alice.johnson@example.com",
        "password": "AnotherPass!789",
        "address": {
            "state": "TX",
            "country": "USA",
            "city": "Austin",
            "street": "Congress Ave",
            "houseNumber": 210,
            "zip": "73301"
        },
        "isBusiness": false
    }
]
const cards = [
    {
        "title": "Exciting New Card",
        "subtitle": "Another test value",
        "description": "Another test value for new card\nAnother test value for new card\n",
        "phone": "050-9876543",
        "email": "example1@gmail.com",
        "web": "https://www.google.com",
        "image": {
            "url": "https://example.com/image1.jpg",
            "alt": "something exciting"
        },
        "address": {
            "state": "NY",
            "country": "USA",
            "city": "New York",
            "street": "Broadway",
            "houseNumber": 100,
            "zip": "10001"
        },
        "bizNumber": "3456789",
        "userId": "60b8d6e4f1c3ae3e4eecf25f"
    },
    {
        "title": "Amazing New Card",
        "subtitle": "Yet another test value",
        "description": "Yet another test value for new card\nYet another test value for new card\n",
        "phone": "050-1234567",
        "email": "example2@gmail.com",
        "web": "https://www.yahoo.com",
        "image": {
            "url": "https://example.com/image2.jpg",
            "alt": "something amazing"
        },
        "address": {
            "state": "CA",
            "country": "USA",
            "city": "Los Angeles",
            "street": "Sunset Blvd",
            "houseNumber": 200,
            "zip": "90001"
        },
        "bizNumber": "1234567",
        "userId": "60b8d6e4f1c3ae3e4eecf25d"
    },
    {
        "title": "Incredible New Card",
        "subtitle": "A unique test value",
        "description": "A unique test value for new card\nA unique test value for new card\n",
        "phone": "050-7654321",
        "email": "example3@gmail.com",
        "web": "https://www.duckduckgo.com",
        "image": {
            "url": "https://example.com/image3.jpg",
            "alt": "something incredible"
        },
        "address": {
            "state": "TX",
            "country": "USA",
            "city": "Austin",
            "street": "Congress Ave",
            "houseNumber": 210,
            "zip": "73301"
        },
        "bizNumber": "2345678",
        "userId": "60b8d6e4f1c3ae3e4eecf25e"
    }
]
export { users, cards }