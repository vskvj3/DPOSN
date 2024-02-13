#### UserData in ipfs 
```json
{
    firstName: string,
    lastName: string,
    image: hash,
    status: string,
    email: string,
    password: string,
    dob: string,
    circle: []
    post: []
}
```

#### UserData in blockchain
```json
{
    mapping(userAddress => hashof(userData in ipfs))

}
```

#### postData
```json
{
    id: ,
    description:,
    image:, 
    comments: []
}
```

#### commentsData
```json
{
    
}
```