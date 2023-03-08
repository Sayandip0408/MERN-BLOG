import { Button } from '@mui/material'
import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InfoIcon from '@mui/icons-material/Info';
import GitHubIcon from '@mui/icons-material/GitHub';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import cv from './SayandipResume1.pdf';

const Footer = () => {

    const link = (address) => {
        if (address === "instagram")
            window.location.href = "https://www.instagram.com/sayan.dip7/";
        else if (address === "facbook")
            window.location.href = "https://www.facebook.com/sayandip.adhikary.96";
        else if (address === "twitter")
            window.location.href = "https://twitter.com/SayandipAdhika1";
        else if (address === "portfolio")
            window.location.href = "https://sayandip2.netlify.app/";
        else if (address === "github")
            window.location.href = "https://github.com/Sayandip0408";
        else if (address === "resume")
            window.location.href = cv;
        else if (address === "mail")
            window.location.href = "mailto:adhikarysayandip@gmail.com";
    }

    return (
        <footer className='container-fluid bg-dark pt-3 pb-3' data-bs-theme="dark">
            <div className="container row" style={{ margin: "auto", height: "fit-content" }}>
                <div className="col-lg-4 col-md-6 col-sm-12 footer-col">
                    <h3>MyBlog.Org</h3>
                    <h6>Copyright @ MyBlog.Org 2023</h6>
                    <Button onClick={() => link("mail")}>Mail: adhikarysayandip@gmail.com</Button>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 footer-col">
                    <h4>Social Media</h4>
                    <Button endIcon={<InstagramIcon />} onClick={() => link("instagram")}>Instagram</Button>
                    <Button endIcon={<FacebookIcon />} onClick={() => link("facebook")}>Facebook</Button>
                    <Button endIcon={<TwitterIcon />} onClick={() => link("twitter")}>Twitter</Button>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 footer-col">
                    <h4>Developer</h4>
                    <Button endIcon={<InfoIcon />} onClick={() => link("portfolio")}>Portfolio</Button>
                    <Button endIcon={<GitHubIcon />} onClick={() => link("github")}>GitHub</Button>
                    <Button endIcon={<DownloadForOfflineIcon />} onClick={() => link("resume")}>Resume</Button>
                </div>
            </div>
            <h5 className='text-center mt-2 mb-2'>Developed by SayanDip Adhikary</h5>
        </footer>
    )
}

export default Footer