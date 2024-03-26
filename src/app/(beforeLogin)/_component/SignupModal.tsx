import style from './signup.module.css';
import {redirect, useRouter} from "next/navigation";
import BackButton from "@/app/(beforeLogin)/_component/BackButton";
import {Simulate} from "react-dom/test-utils";

export default function SignupModal() {
    // const onChangeId: ChangeEventHandler<HTMLInputElement> = (e) => { setId(e.target.value) };
    //
    // const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => { setPassword(e.target.value) };
    // const onChangeNickname: ChangeEventHandler<HTMLInputElement> = (e) => { setNickname(e.target.value) };
    // const onChangeImageFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    //   e.target.files && setImageFile(e.target.files[0])
    // };

    const submit = async (formData: FormData) => {
        "use server"
        let shouldRedirect = false
        if (!formData.get('id')) {
            return {message: 'no_id'}
        }
        if (!formData.get('name')) {
            return {message: 'no_name'}
        }
        if (!formData.get('password')) {
            return {message: 'no_password'}
        }
        if (!formData.get('image')) {
            return {message: 'no_image'}
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, {
                method: 'post',
                body: formData,
                credentials: 'include',
            })
            console.log(response.status);
            if (response.status === 403) {
                return {message: 'user_exists'}
            }
            console.log(await response.json())
          shouldRedirect = true
        } catch (err) {
          console.error(err)
        }

        //try catch 문 밖에서
        if(shouldRedirect){
          redirect('/home')
        }
    }

    return (
        <>
            <div className={style.modalBackground}>
                <div className={style.modal}>
                    <div className={style.modalHeader}>
                        <BackButton/>
                        <div>계정을 생성하세요.</div>
                    </div>
                    <form action={submit}>
                        <div className={style.modalBody}>
                            <div className={style.inputDiv}>
                                <label className={style.inputLabel} htmlFor="id">아이디</label>
                                <input id="id" name="id" className={style.input} type="text" placeholder=""
                                       required
                                />
                            </div>
                            <div className={style.inputDiv}>
                                <label className={style.inputLabel} htmlFor="name">닉네임</label>
                                <input id="name" name="name" className={style.input} type="text" placeholder=""
                                       required
                                />
                            </div>
                            <div className={style.inputDiv}>
                                <label className={style.inputLabel} htmlFor="password">비밀번호</label>
                                <input id="password" name="password" className={style.input} type="password"
                                       placeholder=""
                                       required
                                />
                            </div>
                            <div className={style.inputDiv}>
                                <label className={style.inputLabel} htmlFor="image">프로필</label>
                                <input id="image" name="image" className={style.input} type="file" accept="image/*"
                                       required
                                />
                            </div>
                        </div>
                        <div className={style.modalFooter}>
                            <button type="submit" className={style.actionButton} >가입하기</button>
                        </div>
                    </form>
                </div>
            </div>
        </>)
}