import {useState, useEffect} from 'react';
import {Link, useHistory, useParams} from "react-router-dom";

import DetailHead from '../../mobileComponents/DetailHead';
import CourseCard from '../../mobileComponents/CourseCard';
import Question from '../../mobileComponents/QuestionCard';
import Footer from '../../mobileComponents/Footer';
import DetailFooter from '../../mobileComponents/DetailFooter'
import Review from '../../mobileComponents/Review'

import axios from 'axios';

import './style.scss'

const tutor = {
  "name":"Ming",
  "info":"서울대학교 사회과학부 21학번",
  "intro":"자기소개"
}

const coursel = [{
  id:1,
  "title":"컴퓨터프로그래밍I",
  "univ":"고려대학교",
  "subject":".공학계열.자연계열",
  "subcode":"CH101",
  "writer":"에이쁠"
},
{
  id:2,
  "title":"컴퓨터프로그래밍I",
  "univ":"고려대학교",
  "subject":".공학계열.자연계열",
  "subcode":"CH101",
  "writer":"에이쁠"
},
{
  id:3,
  "title":"컴퓨터프로그래밍I",
  "univ":"고려대학교",
  "subject":".공학계열.자연계열",
  "subcode":"CH101",
  "writer":"에이쁠"
}
]
const review = 
  { id: 1, text: "ddddd", writer: "연세대학교 전기전자", date:5, profile : 'https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1618470409022.png' }

const profile1 = 'https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1618470409022.png';
const profile2 = 'https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1618470422428.png';
const profile3 = 'https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1618470440475.png';
const profile4 = 'https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1618470456681.png';
  
const dummyQuestion = [
  {
    profile: profile1,
    nick: 'Ming',
    created: '1주전',
    content: `<p><span class="ck-math-widget ck-widget" contenteditable="false"><img class="Wirisformula" style="max-width:none;vertical-align:-4px;" role="math" alt="open parentheses table row 1 2 3 row 12 3 31 row 12 cell a 2 end cell 123 row 3 321 123 end table close parentheses" height="93" width="109" data-mathml="«math xmlns=¨http://www.w3.org/1998/Math/MathML¨»«mfenced»«mtable columnlines=¨none solid none¨»«mtr»«mtd»«mn»1«/mn»«/mtd»«mtd»«mn»2«/mn»«/mtd»«mtd»«mn»3«/mn»«/mtd»«/mtr»«mtr»«mtd»«mn»12«/mn»«/mtd»«mtd»«mn»3«/mn»«/mtd»«mtd»«mn»31«/mn»«/mtd»«/mtr»«mtr»«mtd»«mn»12«/mn»«/mtd»«mtd»«mi»a«/mi»«mn»2«/mn»«/mtd»«mtd»«mn»123«/mn»«/mtd»«/mtr»«mtr»«mtd»«mn»3«/mn»«/mtd»«mtd»«mn»321«/mn»«/mtd»«mtd»«mn»123«/mn»«/mtd»«/mtr»«/mtable»«/mfenced»«/math»" src="data:image/svg+xml;charset=utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Awrs%3D%22http%3A%2F%2Fwww.wiris.com%2Fxml%2Fmathml-extension%22%20height%3D%2293%22%20width%3D%22109%22%20wrs%3Abaseline%3D%2252%22%3E%3C!--MathML%3A%20%3Cmath%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F1998%2FMath%2FMathML%22%3E%3Cmfenced%3E%3Cmtable%20columnlines%3D%22none%20solid%20none%22%3E%3Cmtr%3E%3Cmtd%3E%3Cmn%3E1%3C%2Fmn%3E%3C%2Fmtd%3E%3Cmtd%3E%3Cmn%3E2%3C%2Fmn%3E%3C%2Fmtd%3E%3Cmtd%3E%3Cmn%3E3%3C%2Fmn%3E%3C%2Fmtd%3E%3C%2Fmtr%3E%3Cmtr%3E%3Cmtd%3E%3Cmn%3E12%3C%2Fmn%3E%3C%2Fmtd%3E%3Cmtd%3E%3Cmn%3E3%3C%2Fmn%3E%3C%2Fmtd%3E%3Cmtd%3E%3Cmn%3E31%3C%2Fmn%3E%3C%2Fmtd%3E%3C%2Fmtr%3E%3Cmtr%3E%3Cmtd%3E%3Cmn%3E12%3C%2Fmn%3E%3C%2Fmtd%3E%3Cmtd%3E%3Cmi%3Ea%3C%2Fmi%3E%3Cmn%3E2%3C%2Fmn%3E%3C%2Fmtd%3E%3Cmtd%3E%3Cmn%3E123%3C%2Fmn%3E%3C%2Fmtd%3E%3C%2Fmtr%3E%3Cmtr%3E%3Cmtd%3E%3Cmn%3E3%3C%2Fmn%3E%3C%2Fmtd%3E%3Cmtd%3E%3Cmn%3E321%3C%2Fmn%3E%3C%2Fmtd%3E%3Cmtd%3E%3Cmn%3E123%3C%2Fmn%3E%3C%2Fmtd%3E%3C%2Fmtr%3E%3C%2Fmtable%3E%3C%2Fmfenced%3E%3C%2Fmath%3E--%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%40font-face%7Bfont-family%3A'ae2ef524fbf3d9fe611d5a8e90fefdc'%3Bsrc%3Aurl(data%3Afont%2Ftruetype%3Bcharset%3Dutf-8%3Bbase64%2CAAEAAAAMAIAAAwBAT1MvMjv%2FLJYAAADMAAAATmNtYXDgWxEdAAABHAAAADRjdnQgAAAABwAAAVAAAAAEZ2x5ZoYrxVAAAAFUAAAA0WhlYWQOdyayAAACKAAAADZoaGVhC0UVwQAAAmAAAAAkaG10eCg8AIUAAAKEAAAACGxvY2EAAAVKAAACjAAAAAxtYXhwBIoEWwAAApgAAAAgbmFtZXSF9ZsAAAK4AAABrXBvc3QDogHPAAAEaAAAACBwcmVwukanGAAABIgAAAANAAAGtAGQAAUAAAgACAAAAAAACAAIAAAAAAAAAQIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAgICAAAAAg8AMGe%2F57AAAHPgGyAAAAAAACAAEAAQAAABQAAwABAAAAFAAEACAAAAAEAAQAAQAAAGH%2F%2FwAAAGH%2F%2F%2F%2BgAAEAAAAAAAAABwACAFUAAAMAA6sAAwAHAAAzESERJSERIVUCq%2F2rAgD%2BAAOr%2FFVVAwAAAwAt%2F3QEAwRZAAsAFwAdADsYAbAdELAD1LADELAU1LAUELAc1LAcELAJ1LAcELAOPLAJELAbPACwBhCwEdSwBhCwANSwABCwF9QwMQEiABEWEjMyEjcQJgYWAwIGIyImNTQ2MwE1BhMjEgIBs%2F7fFvWy07oDhYZwFgxOhVmysoUB7YwEslEEWf7f%2Ft71%2Ft8BM%2BMBp5yyLf6d%2FwBlyJzfsvxZjF0B5%2F1eAAAAAAEAAAABAACav9usXw889QADCAD%2F%2F%2F%2F%2F1a3uPf%2F%2F%2F%2F%2FVre49AAH%2B9QQDBkMAAAAKAAIAAQAAAAAAAQAABz7%2BTgAAF3AAAf%2F8BAMAAQAAAAAAAAAAAAAAAAAAAAIDUgBVBEwALQAAAAAAAAAoAAAA0QABAAAAAgAeAAMAAAAAAAIAgAQAAAAAAAQAADsAAAAAAAAAFQECAAAAAAAAAAEAFgAAAAAAAAAAAAIADgAWAAAAAAAAAAMANAAkAAAAAAAAAAQAFgBYAAAAAAAAAAUAFgBuAAAAAAAAAAYACwCEAAAAAAAAAAgAHACPAAEAAAAAAAEAFgAAAAEAAAAAAAIADgAWAAEAAAAAAAMANAAkAAEAAAAAAAQAFgBYAAEAAAAAAAUAFgBuAAEAAAAAAAYACwCEAAEAAAAAAAgAHACPAAMAAQQJAAEAFgAAAAMAAQQJAAIADgAWAAMAAQQJAAMANAAkAAMAAQQJAAQAFgBYAAMAAQQJAAUAFgBuAAMAAQQJAAYACwCEAAMAAQQJAAgAHACPAE0AYQB0AGgAIABGAG8AbgB0ACAAMgBSAGUAZwB1AGwAYQByAE0AYQB0AGgAcwAgAEYAbwByACAATQBvAHIAZQAgAE0AYQB0AGgAIABGAG8AbgB0ACAAMgBNAGEAdABoACAARgBvAG4AdAAgADIAVgBlAHIAcwBpAG8AbgAgADEALgAwTWF0aF9Gb250XzIATQBhAHQAaABzACAARgBvAHIAIABNAG8AcgBlAAAAAAMAAAAAAAADnwHPAAAAAAAAAAAAAAAAAAAAAAAAAAC5ByIAAI2FGACyAAAAAAAA)format('truetype')%3Bfont-weight%3Anormal%3Bfont-style%3Anormal%3B%7D%40font-face%7Bfont-family%3A'brack_sm2882ad605b1e27be87c7468'%3Bsrc%3Aurl(data%3Afont%2Ftruetype%3Bcharset%3Dutf-8%3Bbase64%2CAAEAAAAMAIAAAwBAT1MvMi7PH4UAAADMAAAATmNtYXA3kjw6AAABHAAAADxjdnQgAQYDiAAAAVgAAAASZ2x5ZkyYQ7YAAAFsAAAAkWhlYWQLyR8fAAACAAAAADZoaGVhAq0XCAAAAjgAAAAkaG10eDEjA%2FUAAAJcAAAADGxvY2EAAEKZAAACaAAAABBtYXhwBJsEcQAAAngAAAAgbmFtZW7QvZAAAAKYAAAB5XBvc3QArQBVAAAEgAAAACBwcmVwu5WEAAAABKAAAAAHAAACDAGQAAUAAAQABAAAAAAABAAEAAAAAAAAAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAgICAAAAAg9AMD%2FP%2F8AAABVAABAAAAAAACAAEAAQAAABQAAwABAAAAFAAEACgAAAAGAAQAAQACI5wjn%2F%2F%2FAAAjnCOf%2F%2F%2FcZdxjAAEAAAAAAAAAAAFUAFQBAAArAIwAgACoAAcAAAACAAAAAADVAQEAAwAHAAAxMxEjFyM1M9XVq4CAAQHWqwABAAAAAABVAVgAAwAfGAGwAy%2BwADyxAgL1sAE8ALEDAD%2BwAjx8sQAG9bABPBEzESNVVQFY%2FqgAAQDXAAABLAFUAAMAIBgBsAUvsAE8sAI8sQAC9bADPACwAy%2BwAjyxAAH1sAE8EzMRI9dVVQFU%2FqwAAAAAAQAAAAEAAIsesexfDzz1AAMEAP%2F%2F%2F%2F%2FVre5k%2F%2F%2F%2F%2F9Wt7mT%2FgP%2F%2FAdYBWAAAAAoAAgABAAAAAAABAAABVP%2F%2FAAAXcP%2BA%2F4AB1gABAAAAAAAAAAAAAAAAAAAAAwDVAAABLAAAASwA1wAAAAAAAAAhAAAAWAAAAJEAAQAAAAMACgACAAAAAAACAIAEAAAAAAAEAABlAAAAAAAAABUBAgAAAAAAAAABACYAAAAAAAAAAAACAA4AJgAAAAAAAAADAEQANAAAAAAAAAAEACYAeAAAAAAAAAAFABYAngAAAAAAAAAGABMAtAAAAAAAAAAIABwAxwABAAAAAAABACYAAAABAAAAAAACAA4AJgABAAAAAAADAEQANAABAAAAAAAEACYAeAABAAAAAAAFABYAngABAAAAAAAGABMAtAABAAAAAAAIABwAxwADAAEECQABACYAAAADAAEECQACAA4AJgADAAEECQADAEQANAADAAEECQAEACYAeAADAAEECQAFABYAngADAAEECQAGABMAtAADAAEECQAIABwAxwBCAHIAYQBjAGsAZQB0AHMAIABzAG0AYQBsAGwAIABzAGkAegBlAFIAZQBnAHUAbABhAHIATQBhAHQAaABzACAARgBvAHIAIABNAG8AcgBlACAAQgByAGEAYwBrAGUAdABzACAAcwBtAGEAbABsACAAcwBpAHoAZQBCAHIAYQBjAGsAZQB0AHMAIABzAG0AYQBsAGwAIABzAGkAegBlAFYAZQByAHMAaQBvAG4AIAAyAC4AMEJyYWNrZXRzX3NtYWxsX3NpemUATQBhAHQAaABzACAARgBvAHIAIABNAG8AcgBlAAAAAAMAAAAAAAAAqgBVAAAAAAAAAAAAAAAAAAAAAAAAAAC5B%2F8AAo2FAA%3D%3D)format('truetype')%3Bfont-weight%3Anormal%3Bfont-style%3Anormal%3B%7D%40font-face%7Bfont-family%3A'bracketse552f5417ff4680c6b50499'%3Bsrc%3Aurl(data%3Afont%2Ftruetype%3Bcharset%3Dutf-8%3Bbase64%2CAAEAAAAMAIAAAwBAT1MvMi7RIisAAADMAAAATmNtYXBi7uzYAAABHAAAAExjdnQgBAkDLgAAAWgAAAASZ2x5Zo64f%2BkAAAF8AAABSWhlYWQLniGcAAACyAAAADZoaGVhBK4XLAAAAwAAAAAkaG10eCWq%2F90AAAMkAAAAFGxvY2EAABknAAADOAAAABhtYXhwBJIESAAAA1AAAAAgbmFtZRAA8I4AAANwAAAB3nBvc3QBwwDgAAAFUAAAACBwcmVwupWEAAAABXAAAAAHAAACggGQAAUAAAQABAAAAAAABAAEAAAAAAAAAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAgICAAAAAg9AMEAAAAAAADgAAAAAAAAAACAAEAAQAAABQAAwABAAAAFAAEADgAAAAKAAgAAgACI5sjnSOeI6D%2F%2FwAAI5sjnSOeI6D%2F%2F9xm3GXcZdxkAAEAAAAAAAAAAAAAAAABVABWAQAALACoA4AAMgAHAAAAAgAAACoA1QNVAAMABwAANTMRIxMjETPV1auAgCoDK%2F0AAtUAAQAAAAABgAOAAAUAJBgBsAAvsAPFsQEC%2FbADELEEBP0AsQAAP7ABPLEEBj%2BwAzwwMTEzEAEjAFUBKyv%2BqwH8AYT%2BqgABAAAAAAGAA4AABQAmGAGwAC6wA8WxBQL9sAMQsQIE%2FQB8sQAGPxiwBTyxAwb2sAI8MDEREgEzABMBAVQr%2FtMCA4D91v6qAYQB%2FAAB%2F6wAAAEsA4AABQAnGAGwAC%2BwBzywA8WxAQL9sAMQsQQE%2FQCxAAA%2FsAE8sQQGP7ADPDAxISMSATMAASxVAf7UKwFVAfwBhP6rAAH%2FrAAAASwDgAAFACkYAbABL7AHPLAExbEAAv2wBBCxAwT9AHyxAQY%2FsAA8GLEEAD%2BwAzwwMRMzEAEjANdV%2FqsrASsDgP3V%2FqsBhgAAAAABAAAAAQAAeuTcpl8PPPUAAwQA%2F%2F%2F%2F%2F9Wt7o7%2F%2F%2F%2F%2F1a3ujv%2BsAAABgAOAAAAACgACAAEAAAAAAAEAAAOAAAAAABdw%2F6z%2FrAGAAAEAAAAAAAAAAAAAAAAAAAAFANUAAAEsAAABLAAAASz%2FrAEs%2F6wAAAAAAAAAJAAAAGgAAACzAAAA%2FQAAAUkAAQAAAAUACAACAAAAAAACAIAEAAAAAAAEAAA%2BAAAAAAAAABUBAgAAAAAAAAABACQAAAAAAAAAAAACAA4AJAAAAAAAAAADAEIAMgAAAAAAAAAEACQAdAAAAAAAAAAFABYAmAAAAAAAAAAGABIArgAAAAAAAAAIABwAwAABAAAAAAABACQAAAABAAAAAAACAA4AJAABAAAAAAADAEIAMgABAAAAAAAEACQAdAABAAAAAAAFABYAmAABAAAAAAAGABIArgABAAAAAAAIABwAwAADAAEECQABACQAAAADAAEECQACAA4AJAADAAEECQADAEIAMgADAAEECQAEACQAdAADAAEECQAFABYAmAADAAEECQAGABIArgADAAEECQAIABwAwABCAHIAYQBjAGsAZQB0AHMAIABmAHUAbABsACAAcwBpAHoAZQBSAGUAZwB1AGwAYQByAE0AYQB0AGgAcwAgAEYAbwByACAATQBvAHIAZQAgAEIAcgBhAGMAawBlAHQAcwAgAGYAdQBsAGwAIABzAGkAegBlAEIAcgBhAGMAawBlAHQAcwAgAGYAdQBsAGwAIABzAGkAegBlAFYAZQByAHMAaQBvAG4AIAAyAC4AMEJyYWNrZXRzX2Z1bGxfc2l6ZQBNAGEAdABoAHMAIABGAG8AcgAgAE0AbwByAGUAAAADAAAAAAAAAcAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAuQf%2FAAGNhQA%3D)format('truetype')%3Bfont-weight%3Anormal%3Bfont-style%3Anormal%3B%7D%3C%2Fstyle%3E%3C%2Fdefs%3E%3Ctext%20font-family%3D%22bracketse552f5417ff4680c6b50499%22%20font-size%3D%2216%22%20text-anchor%3D%22start%22%20x%3D%221.5%22%20y%3D%2217%22%3E%26%23x239B%3B%3C%2Ftext%3E%3Ctext%20font-family%3D%22brack_sm2882ad605b1e27be87c7468%22%20font-size%3D%2216%22%20text-anchor%3D%22start%22%20x%3D%221.5%22%20y%3D%2222%22%3E%26%23x239C%3B%3C%2Ftext%3E%3Ctext%20font-family%3D%22brack_sm2882ad605b1e27be87c7468%22%20font-size%3D%2216%22%20text-anchor%3D%22start%22%20x%3D%221.5%22%20y%3D%2227%22%3E%26%23x239C%3B%3C%2Ftext%3E%3Ctext%20font-family%3D%22brack_sm2882ad605b1e27be87c7468%22%20font-size%3D%2216%22%20text-anchor%3D%22start%22%20x%3D%221.5%22%20y%3D%2232%22%3E%26%23x239C%3B%3C%2Ftext%3E%3Ctext%20font-family%3D%22brack_sm2882ad605b1e27be87c7468%22%20font-size%3D%2216%22%20text-anchor%3D%22start%22%20x%3D%221.5%22%20y%3D%2237%22%3E%26%23x239C%3B%3C%2Ftext%3E%3Ctext%20font-family%3D%22brack_sm2882ad605b1e27be87c7468%22%20font-size%3D%2216%22%20text-anchor%3D%22start%22%20x%3D%221.5%22%20y%3D%2242%22%3E%26%23x239C%3B%3C%2Ftext%3E%3Ctext%20font-family%3D%22brack_sm2882ad605b1e27be87c7468%22%20font-size%3D%2216%22%20text-anchor%3D%22start%22%20x%3D%221.5%22%20y%3D%2247%22%3E%26%23x239C%3B%3C%2Ftext%3E%3Ctext%20font-family%3D%22brack_sm2882ad605b1e27be87c7468%22%20font-size%3D%2216%22%20text-anchor%3D%22start%22%20x%3D%221.5%22%20y%3D%2252%22%3E%26%23x239C%3B%3C%2Ftext%3E%3Ctext%20font-family%3D%22brack_sm2882ad605b1e27be87c7468%22%20font-size%3D%2216%22%20text-anchor%3D%22start%22%20x%3D%221.5%22%20y%3D%2257%22%3E%26%23x239C%3B%3C%2Ftext%3E%3Ctext%20font-family%3D%22brack_sm2882ad605b1e27be87c7468%22%20font-size%3D%2216%22%20text-anchor%3D%22start%22%20x%3D%221.5%22%20y%3D%2262%22%3E%26%23x239C%3B%3C%2Ftext%3E%3Ctext%20font-family%3D%22brack_sm2882ad605b1e27be87c7468%22%20font-size%3D%2216%22%20text-anchor%3D%22start%22%20x%3D%221.5%22%20y%3D%2267%22%3E%26%23x239C%3B%3C%2Ftext%3E%3Ctext%20font-family%3D%22brack_sm2882ad605b1e27be87c7468%22%20font-size%3D%2216%22%20text-anchor%3D%22start%22%20x%3D%221.5%22%20y%3D%2272%22%3E%26%23x239C%3B%3C%2Ftext%3E%3Ctext%20font-family%3D%22brack_sm2882ad605b1e27be87c7468%22%20font-size%3D%2216%22%20text-anchor%3D%22start%22%20x%3D%221.5%22%20y%3D%2277%22%3E%26%23x239C%3B%3C%2Ftext%3E%3Ctext%20font-family%3D%22bracketse552f5417ff4680c6b50499%22%20font-size%3D%2216%22%20text-anchor%3D%22start%22%20x%3D%221.5%22%20y%3D%2291%22%3E%26%23x239D%3B%3C%2Ftext%3E%3Ctext%20font-family%3D%22bracketse552f5417ff4680c6b50499%22%20font-size%3D%2216%22%20text-anchor%3D%22start%22%20x%3D%22102.5%22%20y%3D%2217%22%3E%26%23x239E%3B%3C%2Ftext%3E%3Ctext%20font-family%3D%22brack_sm2882ad605b1e27be87c7468%22%20font-size%3D%2216%22%20text-anchor%3D%22start%22%20x%3D%22102.5%22%20y%3D%2222%22%3E%26%23x239F%3B%3C%2Ftext%3E%3Ctext%20font-family%3D%22brack_sm2882ad605b1e27be87c7468%22%20font-size%3D%2216%22%20text-anchor%3D%22start%22%20x%3D%22102.5%22%20y%3D%2227%22%3E%26%23x239F%3B%3C%2Ftext%3E%3Ctext%20font-family%3D%22brack_sm2882ad605b1e27be87c7468%22%20font-size%3D%2216%22%20text-anchor%3D%22start%22%20x%3D%22102.5%22%20y%3D%2232%22%3E%26%23x239F%3B%3C%2Ftext%3E%3Ctext%20font-family%3D%22brack_sm2882ad605b1e27be87c7468%22%20font-size%3D%2216%22%20text-anchor%3D%22start%22%20x%3D%22102.5%22%20y%3D%2237%22%3E%26%23x239F%3B%3C%2Ftext%3E%3Ctext%20font-family%3D%22brack_sm2882ad605b1e27be87c7468%22%20font-size%3D%2216%22%20text-anchor%3D%22start%22%20x%3D%22102.5%22%20y%3D%2242%22%3E%26%23x239F%3B%3C%2Ftext%3E%3Ctext%20font-family%3D%22brack_sm2882ad605b1e27be87c7468%22%20font-size%3D%2216%22%20text-anchor%3D%22start%22%20x%3D%22102.5%22%20y%3D%2247%22%3E%26%23x239F%3B%3C%2Ftext%3E%3Ctext%20font-family%3D%22brack_sm2882ad605b1e27be87c7468%22%20font-size%3D%2216%22%20text-anchor%3D%22start%22%20x%3D%22102.5%22%20y%3D%2252%22%3E%26%23x239F%3B%3C%2Ftext%3E%3Ctext%20font-family%3D%22brack_sm2882ad605b1e27be87c7468%22%20font-size%3D%2216%22%20text-anchor%3D%22start%22%20x%3D%22102.5%22%20y%3D%2257%22%3E%26%23x239F%3B%3C%2Ftext%3E%3Ctext%20font-family%3D%22brack_sm2882ad605b1e27be87c7468%22%20font-size%3D%2216%22%20text-anchor%3D%22start%22%20x%3D%22102.5%22%20y%3D%2262%22%3E%26%23x239F%3B%3C%2Ftext%3E%3Ctext%20font-family%3D%22brack_sm2882ad605b1e27be87c7468%22%20font-size%3D%2216%22%20text-anchor%3D%22start%22%20x%3D%22102.5%22%20y%3D%2267%22%3E%26%23x239F%3B%3C%2Ftext%3E%3Ctext%20font-family%3D%22brack_sm2882ad605b1e27be87c7468%22%20font-size%3D%2216%22%20text-anchor%3D%22start%22%20x%3D%22102.5%22%20y%3D%2272%22%3E%26%23x239F%3B%3C%2Ftext%3E%3Ctext%20font-family%3D%22brack_sm2882ad605b1e27be87c7468%22%20font-size%3D%2216%22%20text-anchor%3D%22start%22%20x%3D%22102.5%22%20y%3D%2277%22%3E%26%23x239F%3B%3C%2Ftext%3E%3Ctext%20font-family%3D%22bracketse552f5417ff4680c6b50499%22%20font-size%3D%2216%22%20text-anchor%3D%22start%22%20x%3D%22102.5%22%20y%3D%2291%22%3E%26%23x23A0%3B%3C%2Ftext%3E%3Cline%20stroke%3D%22%23000000%22%20stroke-linecap%3D%22square%22%20stroke-width%3D%221%22%20x1%3D%2267.5%22%20x2%3D%2267.5%22%20y1%3D%222.5%22%20y2%3D%2289.5%22%2F%3E%3Ctext%20font-family%3D%22Arial%22%20font-size%3D%2216%22%20text-anchor%3D%22middle%22%20x%3D%2219.5%22%20y%3D%2217%22%3E1%3C%2Ftext%3E%3Ctext%20font-family%3D%22Arial%22%20font-size%3D%2216%22%20text-anchor%3D%22middle%22%20x%3D%2249.5%22%20y%3D%2217%22%3E2%3C%2Ftext%3E%3Ctext%20font-family%3D%22Arial%22%20font-size%3D%2216%22%20text-anchor%3D%22middle%22%20x%3D%2283.5%22%20y%3D%2217%22%3E3%3C%2Ftext%3E%3Ctext%20font-family%3D%22Arial%22%20font-size%3D%2216%22%20text-anchor%3D%22middle%22%20x%3D%2220.5%22%20y%3D%2240%22%3E12%3C%2Ftext%3E%3Ctext%20font-family%3D%22Arial%22%20font-size%3D%2216%22%20text-anchor%3D%22middle%22%20x%3D%2249.5%22%20y%3D%2240%22%3E3%3C%2Ftext%3E%3Ctext%20font-family%3D%22Arial%22%20font-size%3D%2216%22%20text-anchor%3D%22middle%22%20x%3D%2283.5%22%20y%3D%2240%22%3E31%3C%2Ftext%3E%3Ctext%20font-family%3D%22Arial%22%20font-size%3D%2216%22%20text-anchor%3D%22middle%22%20x%3D%2220.5%22%20y%3D%2263%22%3E12%3C%2Ftext%3E%3Ctext%20font-family%3D%22ae2ef524fbf3d9fe611d5a8e90fefdc%22%20font-size%3D%2216%22%20font-style%3D%22italic%22%20text-anchor%3D%22middle%22%20x%3D%2244.5%22%20y%3D%2263%22%3Ea%3C%2Ftext%3E%3Ctext%20font-family%3D%22Arial%22%20font-size%3D%2216%22%20text-anchor%3D%22middle%22%20x%3D%2254.5%22%20y%3D%2263%22%3E2%3C%2Ftext%3E%3Ctext%20font-family%3D%22Arial%22%20font-size%3D%2216%22%20text-anchor%3D%22middle%22%20x%3D%2283.5%22%20y%3D%2263%22%3E123%3C%2Ftext%3E%3Ctext%20font-family%3D%22Arial%22%20font-size%3D%2216%22%20text-anchor%3D%22middle%22%20x%3D%2219.5%22%20y%3D%2287%22%3E3%3C%2Ftext%3E%3Ctext%20font-family%3D%22Arial%22%20font-size%3D%2216%22%20text-anchor%3D%22middle%22%20x%3D%2249.5%22%20y%3D%2287%22%3E321%3C%2Ftext%3E%3Ctext%20font-family%3D%22Arial%22%20font-size%3D%2216%22%20text-anchor%3D%22middle%22%20x%3D%2283.5%22%20y%3D%2287%22%3E123%3C%2Ftext%3E%3C%2Fsvg%3E" align="middle"><span>&nbsp;</span></span>는 무엇을 의미하나요?</p><p>궁금합니다~!ㅇㅂㅈㅇㅂㅈㅇㅈㅂ어ㅐㅔㅂ저앱저엡저애버제어앶베어베ㅐ</p><p>안녕!</p>`,
    like: 123,
    comment: 3,
    answer: {
      profile: profile2,
      nick: "Jay",
      created: '어제',
      content: '<p>오냐~<p/>'
    },
  },
  {
    profile: profile3,
    nick: 'Ming',
    created: '1주전',
    content: '<p>안녕?<p/>',
    like: 13,
    comment: 6,
    answer: {
      profile: profile4,
      nick: "Jay",
      created: '어제',
      content: '<p>오냐~<p/>'
    },
  },
  {
    profile: profile4,
    nick: 'Ming',
    created: '1주전',
    content: '<p>안녕?<p/>',
    like: 1,
    comment: 0,
  },
  {
    profile: profile1,
    nick: 'Ming',
    created: '1주전',
    content: '<p>안녕?<p/>',
    like: 12893,
    comment: 10,
    answer: {
      profile: profile2,
      nick: "Jay",
      created: '어제',
      content: '<p>오냐~<p/>'
    },
  }
]

const CoursePass = () => {
  const [isContain, setIsContain] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [coursePageId, setCoursePageId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [course, setCourse] = useState([]);

  const { courseId } = useParams();

  useEffect(() => {
    window.scrollTo(0,0);
    getCourse();
  }, [])

  const getCourse = async () => {
    try {
      const result = await axios.get(`/courses/${courseId}`)
      console.log(result, 'result course')
      setQuestions(result.data.questions);
      setBookmarkCount(result.data.bookmarkCount);
      setCoursePageId(result.data.coursePage.id);
      setCourse(result.data);
      if(result.data.bookmark) {
        setIsContain(true);
      } else {
        setIsContain(false);
      }
    } catch(e) {
      console.log(e)
    }
  }

  return(
    <div>
      <div className="m-course-container">
        <div className="m-course-flow">
          <div className="m-course-flow-c">홈</div>
          <div className="m-course-flow-u">></div>
          <div className="m-course-flow-c">고려대학교</div>
          <div className="m-course-flow-u">></div>
          <div className="m-course-flow-u">강의이름</div>
        </div>
        
        <div className="m-course-image">
          <div className="m-course-pass-badge">
            <p>PASS</p>
          </div>
        </div>

        <DetailHead course={course} tutor={tutor}></DetailHead>
        
        <div className="m-course-line"></div>

        <div className="m-course-menu">
          <div className="m-course-sel">
            <div className="m-course-sel-name">
              개념노트
            </div>
          </div>
          <div className="m-course-unsel">
            <div className="m-course-unsel-name">
              연습문제
            </div>
          </div>
          <div className="m-course-unsel">
            <div className="m-course-unsel-name">
              Q&A
            </div>
          </div>
          <div className="m-course-unsel">
            <div className="m-course-unsel-name">
              강의
            </div>
          </div>
        </div>


        <div className="m-course-body-top">
          <div className="m-course-body-top-text3">
            <p>개념 노트</p>
          </div>
          
          <div className="m-course-body-top-middle">
            <div className="m-course-body-top-text2">언택트 시대에 혼자 공부하기 너무 어렵지 않나요? 언택트 시대에 혼자 공부하기 너무 어렵지 않나요?</div>
            <div className="m-course-top-wrap">
              <div className="m-course-body-top-note">
                <div className="m-course-body-top-button"><p>노트 보러가기</p></div>
              </div>
            </div>            
          </div>
        </div>
        
        <div className="m-course-body-top">
          <div className="m-course-body-top-text3">
            <p>연습문제</p>
          </div>
          
          <div className="m-course-body-top-middle">
            <div className="m-course-body-top-text2">수업을 들은 고학점의 튜터들이 직접 만든 연습문제 입니다.수업을 들은 고학점의 튜터들이 직접 만든 연습문제 입니다.</div>
            <div className="m-course-top-wrap">
              <div className="m-course-body-top-note">
                <div className="m-course-body-top-button"><p>문제 풀러가기</p></div>
              </div>
            </div>  
          </div>
        </div>

        <div className="m-course-body-qna">
          <div className="m-course-body-qna-more2">
            <p>더보기 ></p>
          </div>
          <div className="m-course-body-qna-text3">
            <p>Q&A</p>
          </div>
          <div className="m-course-body-qna-text2">
            <p>공부하다가 헷갈리고 잘 모르는 것들 그냥 넘기거나 억지로 외우셨나요? 이제 튜터에게 직접 질문해보세요!</p>
          </div>
          <div className="m-course-body-qnalist ">
            {
              questions && questions.map(question => (
                <div className="qna-wrap">
                  <Question question={question} isPass={true}/>
                </div>
              ))
            }
          </div>
        </div>

        <div className="m-course-body-review">
          <div className="m-course-body-review-text1">
            <p>유저들의</p>
            <p>HOT한 후기를 보세요!</p>
          </div>
          <Review review={review}></Review>
          <Review review={review}></Review>
        </div>
        
        <div className="m-course-line"></div>

        
        <Footer ></Footer>  
        <div className="m-margin-bottom"></div>        
        <DetailFooter isPass={true} isContain={isContain} cnt={bookmarkCount} id={coursePageId}/>

      </div>
    </div>
  )
}

export default CoursePass;