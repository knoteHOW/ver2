import React from "react";
import Note from "../Note";
import {Pagination} from "antd";
import BlankResult from "./BlankResult";

const NoteList = ({notes, isSummary, page, totalCount, pageChanged, query}) => {
  return (
      (notes && notes.length > 0) ?
          <div className="notes-wrapper sections">
            <div className="section-title">
              검색된 노트
            </div>

            <div className={"scroll-wrap"}>
              <ul className="section-list note-list">
                {
                  notes.map(note =>
                      <li className="note" key={note.id}>
                        <Note note={note}/>
                      </li>
                  )
                }
              </ul>
            </div>

            {
              !isSummary ?
                  <Pagination size="small" current={page} total={totalCount} defaultPageSize={12}
                              onChange={pageChanged}/>
                  :
                  <></>
            }
          </div>
          :
          isSummary ?
              <></>
              :
              <BlankResult query={query} />
  );
};

export default NoteList;
