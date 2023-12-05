// // const HDWalletProvider = require('truffle-hdwallet-provider');
// const ganache = require('ganache-cli');
// const Web3 = require('web3');
// const web3 = new Web3(ganache.provider());
// // const compiledTokenSale = require('./build/burt.json');
// const contractFile = require('./compile');

// const bytecode =  contractFile.evm.bytecode.object;
// const abi = contractFile.abi;

// // const provider = new HDWalletProvider(
// //     'witness raven object major draft rocket debate step rural chase win report',
// //     'https://ropsten.infura.io/v3/aa5f11c4ffab41369f674ff862972eaa');
// // const web3 = new Web3(provider);
// // console.log(web3);

// const deploy = async() => {
//     const accounts = await web3.eth.getAccounts();
//     console.log(accounts);
//     // console.log('Deploye contract from this account address',accounts[0]);
//     try{
//         const result = await new web3.eth.Contract(abi)
//               .deploy(
//                   {data : bytecode ,
//                   arguments:["0x48f0645F71057693D84535E279e83Ee222DCA148",1,"0x30609ea2E1b30C6364ffdecECb938186827D9d87","JhonTitle","JhonDescription"]
//                 })
//               .send({from: accounts[0],gas:'1000000'});
//             //   ,function (error, transactionHash) {

//                         // }).on('error', function (error) {
//                         //     console.log('error', error);
//                         // }).on('transactionHash', function (transactionHash) {
//                         //     console.log('transactionHash', transactionHash);
//                         // }).on('receipt', function (receipt) {
//                         //     console.log('receipt', receipt.contractAddress);
//                         // }).on('confirmation', function (confirmationNumber, receipt) {
//                         //     console.log('confirmation', confirmationNumber);
//                         // });
//             console.log("Contract deployed to",result.options.address);
//     }catch(e){
//         console.log("Error HAI ",e)
//     }
 
    
// };
// deploy();

// token address (1000 suply) = 0x48f0645F71057693D84535E279e83Ee222DCA148