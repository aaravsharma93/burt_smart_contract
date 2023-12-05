// const path = require('path');
// const solc = require('solc');
// const fs = require('fs-extra');

// const buildPath = path.resolve(__dirname, 'build');
// fs.removeSync(buildPath); //delete entire build folder 

// const tokenPath = path.resolve(__dirname, 'contracts', 'TokenSale.sol'); // read 'burt.sol from contracts folder
// // console.log(tokenPath);
// const source = fs.readFileSync(tokenPath, 'utf8');
// // console.log(source);
// const output = solc.compile(source, 1).contracts; // compiler both contract with solidity compiler

// fs.ensureDirSync(buildPath);//check if dir not exist we creat 
// console.log(output);

// // this code save output in json file which is presennt in build directory
// for(let contract in output){
//     fs.outputJsonSync(
//         path.resolve(buildPath, contract.replace(':', '') + '.json'),
//         output[contract]
//     );
// }
//========================================
const HDWalletProvider = require('truffle-hdwallet-provider');
const path = require('path');
const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');
// const ganache = require('ganache-cli');
// const web3 = new Web3(ganache.provider());
const provider = new HDWalletProvider(
    'witness raven object major draft rocket debate step rural chase win report',
    // 'https://ropsten.infura.io/v3/83cd2a3764614a96b3208ba555efe189');
    'https://eth-ropsten.alchemyapi.io/v2/vn1DpfwoCg19Vwh3OEcG6292KdS6dhnB')
console.log(provider);
const web3 = new Web3(provider);
const inboxpath = path.resolve(__dirname, 'Contracts', 'TokenSale.sol');
const source = fs.readFileSync(inboxpath, 'UTF-8');
// console.log(source,"here is source");
const input = {
  language: 'Solidity',
  sources: {
    'TokenSale.sol' : {
        content: source
    }
},
settings: {
    outputSelection: {
        '*': {
            '*': [ '*' ]
        }
    }
}
};
// console.log(input,"here is input");
// const output = solc.compile(input);
// console.log(output,"here is output");
const output = JSON.parse(solc.compile(JSON.stringify(input)));
// console.log(output);

const contractFile = output.contracts['TokenSale.sol']['TokenSale'];
// module.exports = contractFile;
// exports.abi = output.contracts['TokenSale.sol']['TokenSale'].abi;
// exports.bytecode = output.contracts['TokenSale.sol'] ['TokenSale'].evm.bytecode.object;
// a = exports.abi;
// b = exports.bytecode;
const bytecode =  contractFile.evm.bytecode.object;
const abi = contractFile.abi;
console.log(bytecode);
console.log(abi);
const deploy = async() => {
    const accounts = await web3.eth.getAccounts();
    // console.log(accounts);
    console.log('Deploye contract using account address',accounts[0]);
    try{
        const result = await new web3.eth.Contract(abi)
              .deploy(
                  {data : bytecode ,
                  arguments:["0x48f0645F71057693D84535E279e83Ee222DCA148",1,"0x30609ea2E1b30C6364ffdecECb938186827D9d87","JhonTitle","JhonDescription"]
                })
              .send({from: accounts[0],gas:'3000000',gasPrice: 25000000000});
            //   ,function (error, transactionHash) {

                        // }).on('error', function (error) {
                        //     console.log('error', error);
                        // }).on('transactionHash', function (transactionHash) {
                        //     console.log('transactionHash', transactionHash);
                        // }).on('receipt', function (receipt) {
                        //     console.log('receipt', receipt.contractAddress);
                        // }).on('confirmation', function (confirmationNumber, receipt) {
                        //     console.log('confirmation', confirmationNumber);
                        // });
            console.log("Deployed Contract Address Created Here ",result.options.address);
    }catch(e){
        console.log("Error HAI ",e)
    }
 
    
};
deploy();