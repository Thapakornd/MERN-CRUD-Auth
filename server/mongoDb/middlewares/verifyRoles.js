const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        //console.log(req?.roles);
        const rolesArray = [...allowedRoles];
        console.log(rolesArray);

        if (!req?.roles) return res.status(400);
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        if (!result) return res.status(401);

        next();
    }
}

export default verifyRoles;