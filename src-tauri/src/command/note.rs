use crate::core::db::DB;

#[derive(serde::Serialize, sqlx::FromRow)]
pub struct Note {
    id: i32,
    title: String,
}

#[tauri::command]
pub async fn get_notes() -> Vec<Note> {
    let db = DB.get().unwrap();
    sqlx::query_as::<_, Note>("SELECT * FROM note")
        .fetch_all(db)
        .await
        .unwrap()
}

#[tauri::command]
pub async fn add_note(title: String) -> Note {
    println!("add_note: title={}", title);
    let db = DB.get().unwrap();
    let note = sqlx::query_as::<_, Note>("INSERT INTO note (title) VALUES (?) RETURNING *")
        .bind(title)
        .fetch_one(db)
        .await
        .unwrap();
    sqlx::query("INSERT INTO note_data (noteId, data) VALUES (?, ?)")
        .bind(note.id)
        .bind("")
        .execute(db)
        .await
        .unwrap();
    note
}

#[tauri::command]
pub async fn get_note_data(id: i32) -> String {
    println!("get_note_data: id={}", id);
    let db = DB.get().unwrap();
    let note_data: Option<String> =
        sqlx::query_scalar("SELECT data FROM note_data WHERE noteId = ?")
            .bind(id)
            .fetch_optional(db)
            .await
            .unwrap();
    match note_data.is_none() {
        true => {
            println!("get_note_data: no data found for id={}", id);
            "".to_string()
        }
        false => note_data.unwrap(),
    }
}

#[tauri::command]
pub async fn update_note(id: i32, data: String) {
    println!("update_note: id={}, data={}", id, data);
    let db = DB.get().unwrap();
    sqlx::query("UPDATE note_data SET data = ? WHERE noteId = ?")
        .bind(data)
        .bind(id)
        .execute(db)
        .await
        .unwrap();
}

#[tauri::command]
pub async fn delete_note(id: i32) {
    println!("delete_note: id={}", id);
    let db = DB.get().unwrap();
    sqlx::query("DELETE FROM note_data WHERE noteId = ?")
        .bind(id)
        .execute(db)
        .await
        .unwrap();
    sqlx::query("DELETE FROM note WHERE id = ?")
        .bind(id)
        .execute(db)
        .await
        .unwrap();
}
