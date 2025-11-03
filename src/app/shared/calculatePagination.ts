const calculatePaginating = (page: number, limit: number) => {
    const skip = (page - 1) * limit;
    const take = limit;
    return { skip, take }
}

export default calculatePaginating