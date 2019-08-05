# CryptoStar Dapp on Ethereum
## Udacity BlockchainND Project5

The CryptoStar is a decentralized application built on the top of Ethereum Network. Additionally, the current project is also applying the implementation of ERC721 non-fungible token contract. 

# Table of Contents

  * [Meta Information](#meta-information)
  * [Built With](#built-with)
  * [Installation](#installation)
    + [Deploy Smart Contract](#deploy-smart-contract)
    + [Setup Production](#setup-production)
  * [Features](#features)
  * [Contributing](#contributing)
  * [License](#license)

## Meta Information
Token Name: `CryptoStar Token`
Token Symbol: `CST`
Truffle: `5.0.26`
OpenZeppelin: `2.3.0`

## Built With

Ethereum, Solidity, Truffle, OpenZeppelin, Vue.js

## Installation

1. Install the code on your local system
     
    1. Fork this repository (click 'Fork' button in top right corner)
    2. Clone the forked repository on your local file system
    
    ```
    cd /path/to/install/location
    
    https://github.com/m-yahya/udacity-BlockchainND-project5.git
    ```

2. Change directory into the local clone of the repository

    ```
    cd udacity-BlockchainND-project5
    ```

3. Install dependencies

    ```
    npm install
    ```

### Deploy Smart Contract
Inside the root directory:

1. Open truffle console:

    ```
    truffle develop
    ```

2. Compile contracts

    ```
    compile
    ```

3. Deploy contracts

    ```
    migrate --reset
    ```

### Setup Production

To setup frontend:

1. Change directory to `app` located inside the repository
    ``` cd app```

2. Install dependencies

    ```
    npm install
    ```
3. Start development
    ```
    npm run serve
    ````

4. To create a production build
    ```
    npm run build
    ````


## Features

* Create Stars
* Stars Lookup
* Buy Stars
* Exchange Stars
* Transfer Stars

## Contributing
Pull requests are welcome. 

1. Fork the repository.
2. Create your new feature branch: `git checkout -b new-feature-branch`
3. Stage your changes: `git add .`
4. Commit the changes: `git commit -m "add commit message"`
5. `push` to the branch: `git push origin new-feature-branch`
6. Submit a `pull request`.


