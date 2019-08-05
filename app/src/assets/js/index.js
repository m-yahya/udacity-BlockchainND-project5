import Web3 from "web3";
import starNotaryArtifact from "../../../../build/contracts/StarNotary.json";

export default class Provider {

    instance = null;

    async start() {
        // modern dapp browser
        if (window.ethereum) {
            window.web3 = new Web3(ethereum);
            try {
                // request account access if needed
                await ethereum.enable();
            } catch (error) {
                console.log(error);
            }

            // legacy dapp browser
        } else if (window.web3) {
            window.web3 = new Web3(web3.currentProvider);
            // accounts always exposed
        } else {
            console.log("Non-Ethereum browser");
            // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
            window.web3 = new Web3(
                new Web3.providers.HttpProvider("http://localhost:9545")
            );
        }

        // get contract instance
        const networkId = await web3.eth.net.getId(); //This method find the network id to retrieve the configuration from truffle-config.js file
        const deployedNetwork = starNotaryArtifact.networks[networkId]; // Retrieve the Network configuration from truffle-config.js file

        this.instance = new web3.eth.Contract( // Initializing the contract
            starNotaryArtifact.abi,
            deployedNetwork.address
        );

    }
}