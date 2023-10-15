import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

function Redirection()
{

return(
    <div>
        {Cookies.get("careId")?<Navigate to="/cp"></Navigate>:Cookies.get("adminId")?<Navigate to="/superadmin/"></Navigate>:Cookies.get("memberId")?<Navigate to="/member"></Navigate>:<Navigate to="/member/register"></Navigate>}
        
    </div>
)
}

export default Redirection;