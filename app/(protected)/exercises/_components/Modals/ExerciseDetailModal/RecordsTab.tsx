'use client';

export default function RecordsTab() {
    return (
        <div>
            <ul>
                <li className="flex justify-between">
                    <span>1RM</span>
                    <span>37KG</span>
                </li>
                <li className="flex justify-between">
                    <span>Weight</span>
                    <span>28KG (x10)</span>
                </li>
                <li className="flex justify-between">
                    <span>Max Volume</span>
                    <span>560KG</span>
                </li>
            </ul>

            <table className="w-full text-center">
                <thead>
                    <tr>
                        <th>Reps</th>
                        <th>Best Performance</th> 
                        <th>Predicted</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>
                            <div>40 kg (x2)</div>
                            <div className="text-sm">31 Aug 2023</div>
                        </td> 
                        <td>42kg</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>
                            <div>40 kg (x2)</div>
                            <div className="text-sm">31 Aug 2023</div>
                        </td> 
                        <td>42kg</td>
                    </tr>

                </tbody>
            </table>

        </div>
    )
}