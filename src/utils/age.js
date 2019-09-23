export const computeAge = (birthday) => {
    if (birthday instanceof Date) {
        let birthYear = birthday.getFullYear(),
            birthMonth = birthday.getMonth() + 1,
            birthDate = birthday.getDate(),
            now = new Date(),
            nowYear = now.getFullYear(),
            nowMonth = now.getMonth() + 1,
            nowDate = now.getDate();
        if (new Date(birthYear, birthMonth - 1, birthDate).getTime() > new Date(nowYear, nowMonth - 1, nowDate).getTime())
            throw "the birthday must be smaller than now";
        if (nowYear == birthYear) return 0;
        let age = nowYear - birthYear;
        if (nowMonth == birthMonth) {
            let dateDiff = nowDate - birthDate;
            if (dateDiff < 0) return age - 1;
            else return age;
        } else {
            let monthDiff = nowMonth - birthMonth;
            if (monthDiff < 0) return age - 1;
            else return age;
        }
    } else throw "the param birthday must be a Date";
}