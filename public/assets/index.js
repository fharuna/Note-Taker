var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $saveNoteBtn = $(".save-note");
var $newNoteBtn = $(".new-note");
var $noteList = $(".list-container .list-group");

var activeNote = {};

// to get notes from the database
var getNotes = function() {
  return $.ajax({
    url: "/api/notes",
    method: "GET"
  });
};

// to save notes to the database
var saveNote = function(note) {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST"
  });
};

// to delete notes from the database
var deleteNote = function(id) {
    return $.ajax({
      url: "api/notes" + id,
      method: "DELETE"
    });
  };

  var renderActiveNote = function() {
    $saveNoteBtn.hide();
  
    if (activeNote.id) {
      $noteTitle.attr("readonly", true);
      $noteText.attr("readonly", true);
      $noteTitle.val(activeNote.title);
      $noteText.val(activeNote.text);
    } else {
      $noteTitle.attr("readonly", false);
      $noteText.attr("readonly", false);
      $noteTitle.val("");
      $noteText.val("");
    }
  };

  var handleNoteDelete = function(event) {
    event.stopPropagation();
  
    var note = $(this)
      .parent(".list-group-item")
      .data();
  
    if (activeNote.id === note.id) {
      activeNote = {};
    }
  
    deleteNote(note.id).then(function() {
      getAndRenderNotes();
      renderActiveNote();
    });
  };
