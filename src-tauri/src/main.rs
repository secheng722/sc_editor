// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use crate::command::note::{add_note, delete_note, get_note_data, get_notes, update_note};

pub mod command;
pub mod core;

#[tokio::main]
async fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_note_data,
            get_notes,
            add_note,
            update_note,
            delete_note
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
