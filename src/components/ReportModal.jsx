import { Modal, Label, Radio, Button, Spinner } from "flowbite-react";
import { useState } from "react";
import { toast } from "sonner";
import { reportPost } from "../services/api/user/apiMethods";

function ReportModal({ userId, postId, openReportModal, closeReportModal }) {
    const [reportCause, setReportCause] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleReport = () => {
        setIsLoading(true);
        reportPost({ userId, postId, cause: reportCause })
            .then(() => {
                toast.info("You have reported this post");
                setIsLoading(false);

                closeReportModal();
            })
            .catch((err) => {
                toast.error(err.message);
                setIsLoading(false);
                closeReportModal();
            });
    };

    return (
        <div>
            <Modal show={openReportModal} size="md" onClose={closeReportModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <fieldset className="flex max-w-md flex-col gap-4">
                        <legend className="mb-4">Choose your Report cause</legend>
                        <div className="flex items-center gap-2">
                            <Radio
                                id="nudity"
                                name="reportCause"
                                value="Post contains nudity"
                                onChange={(e) => setReportCause(e.target.value)}
                            />
                            <Label htmlFor="nudity">Post contains nudity</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Radio
                                id="racist-content"
                                name="reportCause"
                                value="Racist content"
                                onChange={(e) => setReportCause(e.target.value)}
                            />
                            <Label htmlFor="racist-content">Racist content</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Radio
                                id="violence"
                                name="reportCause"
                                value="Post contains violence"
                                onChange={(e) => setReportCause(e.target.value)}
                            />
                            <Label htmlFor="violence">Post contains violence</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Radio
                                id="hate-speech"
                                name="reportCause"
                                value="Hate speech"
                                onChange={(e) => setReportCause(e.target.value)}
                            />
                            <Label htmlFor="hate-speech">Hate speech</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Radio
                                id="spam"
                                name="reportCause"
                                value="Spam or misleading"
                                onChange={(e) => setReportCause(e.target.value)}
                            />
                            <Label htmlFor="spam">Spam or misleading</Label>
                        </div>
                        <Button onClick={handleReport} color="failure">
                            {isLoading && (
                                <Spinner color="failure" aria-label="Failure spinner example" />
                            )}
                            Report
                        </Button>
                    </fieldset>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ReportModal
