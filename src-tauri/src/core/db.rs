use std::str::FromStr;

use sqlx::{
    sqlite::{SqliteConnectOptions, SqliteJournalMode, SqlitePoolOptions},
    SqlitePool,
};
use tokio::sync::OnceCell;

pub static DB: OnceCell<SqlitePool> = OnceCell::const_new();

pub async fn init_db() {
    DB.get_or_init(|| async { connect().await.unwrap() }).await;
}

pub async fn connect() -> Result<SqlitePool, sqlx::Error> {
    let conn = SqliteConnectOptions::from_str("sqlite://data.db")?
        .create_if_missing(true)
        .journal_mode(SqliteJournalMode::Wal);
    let pool = SqlitePoolOptions::new()
        .max_connections(1)
        .connect_with(conn)
        .await?;
    sqlx::migrate!("./migrations").run(&pool).await?;

    Ok(pool)
}
