import React from 'react';
import {Card, Table} from "react-bootstrap";
import Student from "../../domains/Student";
import DateParser from "../../../utils/DateParser";

const MatriculationView = ({student}) => {

    const dateParser =
        new DateParser(DateParser.FORMAT.DD_MM_YYYY, DateParser.DELIMITER.SLASH);

    return (
        <Card style={{height: "100%"}}>
            <Card.Header>
                <Card.Title>Inamatriculare</Card.Title>
            </Card.Header>
            <Card.Body>

                <Table bordered={false} striped={false} size={"2sm"}>
                    <tbody>
                    <tr>
                        <th>Corporativ email</th>
                        <td>{student.corporateEmail}</td>
                    </tr>
                    <tr>
                        <th>Diploma. Seria</th>
                        <td>{student.diplomaSeries}</td>
                    </tr>
                    <tr>
                        <th>Diploma. Numar</th>
                        <td>{student.diplomaNumber}</td>
                    </tr>
                    <tr>
                        <th>Tip inamatriculare</th>
                        <td>
                            {Student.getConstants().getByConstId(
                                Student.getConstants().REGISTRATION, student.registration).value}
                        </td>
                    </tr>
                    <tr>
                        <th>Studii</th>
                        <td>
                            {Student.getConstants().getByConstId(
                                Student.getConstants().STUDY_TYPE, student.studyType).value}
                        </td>
                    </tr>
                    <tr>
                        <th>Finanțare</th>
                        <td>
                            {Student.getConstants().getByConstId(
                                Student.getConstants().FINANCING, student.financing).value}
                        </td>
                    </tr>
                    <tr>
                        <th>Anul de studii</th>
                        <td>
                            {Student.getConstants().getByConstId(
                                Student.getConstants().YEAR_STUDY, student.yearStudy).value}
                        </td>
                    </tr>
                    <tr>
                        <th>Inceputul studiilor</th>
                        <td>{student.beginStudies ? dateParser.toString(student.beginStudies) : ''}</td>
                    </tr>
                    <tr>
                        <th>Finalizarea studiilor</th>
                        <td>{student.endStudies ? dateParser.toString(student.endStudies) : ''}</td>
                    </tr>
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default MatriculationView;