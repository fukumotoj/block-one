import {GetInfoResult} from 'eosjs/dist/eosjs-rpc-interfaces';
import { EOSBlockLoader } from '../blockloader';
let blockLoader: EOSBlockLoader,
    testBlocks: any[];
beforeEach(()=>{
    blockLoader = new EOSBlockLoader();
    testBlocks = [];
    for(let i = 30; i >= 1; i--){
        testBlocks.push(createTestBlock('id'+(i+1), i, 'id'+i));
    }
});

describe('Mock test the load blockLoader',()=>{
    let getRecentSpy:any, loadBlockSpy:any;
    beforeEach(() => {
        getRecentSpy = blockLoader["getMostRecentBlock"] = jest.fn(async () => { return Promise.resolve(mockMostRecentBlock({'blockNumber':21, 'blockId':'id21'}))} );
        loadBlockSpy = blockLoader["loadBlockByBlockNumberOrId"] = jest.fn(async (blockId) => {
            for (let i=0; i< testBlocks.length; i++){
                if(testBlocks[i].id === blockId || testBlocks[i].block_num === blockId){
                    return Promise.resolve(testBlocks[i]);
                }
            }
            return Promise.resolve(null);
        });
    });
    
    it('expect getMostRecentBlock to be called once', async (done) =>{
        await blockLoader.loadBlocks();
        expect(getRecentSpy.mock.calls.length).toBe(1);
        done();
    });
    
    it('expect loadBlockByBlockNumberOrId to be called ten times', async (done) =>{
        await blockLoader.loadBlocks();
        expect(loadBlockSpy.mock.calls.length).toBe(10);
        done();
    });

    it('simulate an impatient user clicking and expect only 10 blocks', async(done) => {
        await blockLoader.loadBlocks();
        await blockLoader.loadBlocks();
        await blockLoader.loadBlocks();

        expect(getRecentSpy.mock.calls.length).toBe(3);
        expect(loadBlockSpy.mock.calls.length).toBe(30);
        done();
    });

    it('loads only new blocks', async(done) => {
        await blockLoader.loadBlocks();

        let privateBlocks = blockLoader["listOfBlocks"];
        expect(privateBlocks[0].id).toBe('id22');
        expect(privateBlocks[9].id).toBe('id13');
        done();
    });

});
describe('Test the block loads', ()=>{
    let getRecentSpy:any, loadBlockSpy:any;
    beforeEach(() => {
        getRecentSpy = blockLoader["getMostRecentBlock"] = jest.fn()
        getRecentSpy.mockReturnValueOnce(Promise.resolve(mockMostRecentBlock({'blockNumber':21, 'blockId':'id21'})));
        getRecentSpy.mockReturnValueOnce(Promise.resolve(mockMostRecentBlock({'blockNumber':25, 'blockId':'id25'})));
        loadBlockSpy = blockLoader["loadBlockByBlockNumberOrId"] = jest.fn(async (blockId) => {
            for (let i=0; i< testBlocks.length; i++){
                if(testBlocks[i].id === blockId || testBlocks[i].block_num === blockId){
                    return Promise.resolve(testBlocks[i]);
                }
            }
            return Promise.resolve(null);
        });
    });
    it('loads the blocks in expected order', async(done) =>{
        await blockLoader.loadBlocks();
        let privateBlocks = blockLoader["listOfBlocks"];
        expect(privateBlocks[0].id).toBe('id22');
        expect(privateBlocks[9].id).toBe('id13');
        done();
    });

    it('loads only new blocks', async(done) => {
        await blockLoader.loadBlocks();
        expect(getRecentSpy.mock.calls.length).toBe(1);
        expect(loadBlockSpy.mock.calls.length).toBe(10);

        await blockLoader.loadBlocks();
        expect(getRecentSpy.mock.calls.length).toBe(2);
        expect(loadBlockSpy.mock.calls.length).toBe(14);
        done();
    });

});

function mockMostRecentBlock(options:any): GetInfoResult {
    return {
        server_version: 'dummy',
        chain_id: 'dummy',
        head_block_num: options.blockNumber,
        last_irreversible_block_num: options.blockNumber,
        last_irreversible_block_id: options.blockId,
        head_block_id: options.blockId,
        head_block_time: 'dummy',
        head_block_producer: 'dummy',
        virtual_block_cpu_limit: 123,
        virtual_block_net_limit: 456,
        block_cpu_limit: 678,
        block_net_limit: 789
    };
}
function createTestBlock(blockId:string, num:number, previousBlock:string): any{
    return {
        id: blockId,
        block_num: num,
        previous: previousBlock
    };
}