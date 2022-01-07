use anchor_lang::prelude::*;

declare_id!("3X2JrkSViyKSNzP9XQqKB2urAew47cinF2L9tf3s2isE");

#[error]
pub enum ErrorCode {
    #[msg("The provided hash should be 50 characters long maximum.")]
    HashTooLong,
}

#[program]
mod promise_app {
    use super::*;

    pub fn create(ctx: Context<Create>,hash:String) -> ProgramResult {
        let promise: &mut Account<Promise> = &mut ctx.accounts.promise; 
        let author: &Signer = &ctx.accounts.author;
        let clock: Clock = Clock::get().unwrap();

        if hash.chars().count() > 64 {
            return Err(ErrorCode::HashTooLong.into())
        }

        promise.author = *author.key;
        promise.ipfs_hash = hash;
        promise.timestamp = clock.unix_timestamp;
        Ok(())
    }

}

// Transaction instructions
#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer = author, space = Promise::LEN)]
    pub promise: Account<'info, Promise>,
    #[account(mut)]
    pub author: Signer<'info>,
    pub system_program: Program <'info, System>,
}


// An account that goes inside a transaction instruction
#[account]
pub struct Promise {
    pub author:Pubkey,
    pub ipfs_hash:String,
    pub timestamp: i64,

}
const DISCRIMINATOR_LENGTH: usize = 8;
const TIMESTAMP_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
const STRING_LENGTH_PREFIX: usize = 4; // Stores the size of the string.
const MAX_IPFS_HASH_LENGTH: usize = 64 * 4; // 64 chars max.

impl Promise{
    const LEN:usize= DISCRIMINATOR_LENGTH
                + TIMESTAMP_LENGTH
                + PUBLIC_KEY_LENGTH
                + STRING_LENGTH_PREFIX + MAX_IPFS_HASH_LENGTH;
}

