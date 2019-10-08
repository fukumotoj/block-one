import { JsonRpc } from 'eosjs';
import * as eos from 'eosjs/dist/eosjs-rpc-interfaces';

export class EOSBlockLoader {
    private rpc = new JsonRpc('https://api.eosnewyork.io');
    private listOfBlocks: any[] = [];

    public async loadBlocks(): Promise<any[]> {
        const mostRecentBlock: eos.GetInfoResult = await this.getMostRecentBlock();
        if(this.isMostRecentBlock(mostRecentBlock.head_block_num)) { return this.listOfBlocks; }
        let refreshedBlockList = [await this.loadBlockByBlockNumberOrId(mostRecentBlock.head_block_num)];
        
        while(refreshedBlockList.length < 10) {
            let lastBlock = refreshedBlockList[refreshedBlockList.length - 1];
            if(this.isPreviousBlock(lastBlock.previous)) {
                refreshedBlockList = this.joinPreviousBlockListToLatestBlocks(refreshedBlockList);
            } else {
                refreshedBlockList.push(await this.loadBlockByBlockNumberOrId(lastBlock.previous));
            }
        }   
        this.listOfBlocks = refreshedBlockList;

        return this.listOfBlocks;
    }
    
    private async getMostRecentBlock(): Promise<eos.GetInfoResult>{
       const lastBlock: eos.GetInfoResult = await this.rpc.get_info();
       return lastBlock;
    }

    private isMostRecentBlock(headBlockNumber: number): boolean {
        return this.listOfBlocks.length > 0 && headBlockNumber === this.listOfBlocks[0].head_block_num;
    }

    private async loadBlockByBlockNumberOrId(headBlockNumber: number|string):Promise<eos.GetBlockResult> {
        return await this.rpc.get_block(headBlockNumber);
    }

    private isPreviousBlock(previousBlockId:string) {
        return this.listOfBlocks.length > 0 && previousBlockId === this.listOfBlocks[0].id;
    }

    private joinPreviousBlockListToLatestBlocks(newBlocks:eos.GetBlockResult[]): eos.GetBlockResult[] {
        return newBlocks.concat(this.listOfBlocks).splice(0,10);
    }    
}